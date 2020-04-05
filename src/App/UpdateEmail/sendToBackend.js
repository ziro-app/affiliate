import { post } from 'axios'
import { fbauth, auth, db } from '../../Firebase/index'
import { findAffiliateRow } from '../utils'

const sendToBackend = state => () => {
	const { pass, newEmail } = state
	const url = process.env.SHEET_URL
	const config = {
		headers: {
			'Content-type': 'application/json',
			'Authorization': process.env.SHEET_TOKEN
		}
	}
	return new Promise(async (resolve, reject) => {
		try {

			const user = auth.currentUser
			const credential = fbauth.EmailAuthProvider.credential(user.email, pass)
			await user.reauthenticateWithCredential(credential)
			try {
				const snapAffiliate = await db.collection('affiliates').where('uid', '==', user.uid).get()
				let docRefAffiliate
				snapAffiliate.forEach(doc => docRefAffiliate = doc.ref)
				const snapUser = await db.collection('users').where('email', '==', user.email).get()
				let docRefUser, userApp
				snapUser.forEach(doc => {
					userApp = doc.data().app
					docRefUser = doc.ref
				})
				if (userApp === 'admin') throw { msg: 'Não permitido para admin', customError: true }
				await user.updateEmail(newEmail.toLowerCase())
				await docRefAffiliate.update({ email: newEmail.toLowerCase() })
				await docRefUser.update({ email: newEmail.toLowerCase() })
				const affiliateRow = await findAffiliateRow(snapAffiliate.docs[0].data().cpf)
				const body = {
					apiResource: 'values',
					apiMethod: 'update',
					range: `Afiliados!F${affiliateRow}`,
					valueInputOption: 'raw',
					spreadsheetId: process.env.SHEET_ID_REGISTER_APPEND,
					resource: {
						values: [[newEmail.toLowerCase()]]
					}
				}
				await post(url, body, config)
				try {
					await user.sendEmailVerification({ url: `${process.env.CONTINUE_URL}` })
					window.alert('Email atualizado! Acesse a confirmação na sua caixa de entrada e refaça o login')
					window.location.replace('/')
					await auth.signOut()
				} catch (error) {
					throw error
				}
			} catch (error) {
				if (error.response) console.log(error.response)
				throw error
			}
		} catch (error) {
			if (error.response) console.log(error.response)
			if (error.code) {
				switch (error.code) {
					case 'auth/network-request-failed': reject({ msg: 'Sem conexão com a rede', customError: true })
					case 'auth/invalid-email': reject({ msg: 'Email inválido', customError: true })
					case 'auth/user-disabled': reject({ msg: 'Usuário bloqueado', customError: true })
					case 'auth/user-not-found': reject({ msg: 'Usuário não cadastrado', customError: true })
					case 'auth/wrong-password': reject({ msg: 'Senha incorreta', customError: true })
					case 'auth/email-already-in-use': reject({ msg: 'Email já cadastrado', customError: true })
					case 'auth/operation-not-allowed': reject({ msg: 'Operação não permitida', customError: true })
					case 'auth/too-many-requests': reject({ msg: 'Muitas tentativas. Tente mais tarde', customError: true })
				}
			} else reject(error)
		}
	})
}

export default sendToBackend