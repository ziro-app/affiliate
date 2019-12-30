import { auth, db } from '../../Firebase/index'
import { post } from 'axios'

const sendToBackend = state => () => {
	const { brand, fname, lname, cpf, whats, email, pass, confirmPass,
		setBrand, setFname, setLname, setCpf, setWhats, setEmail, setPass, setConfirmPass } = state
	const url = process.env.GOOGLE_API_URL
	const body = {
		apiResource: 'values',
		apiMethod: 'append',
		spreadsheetId: process.env.GOOGLE_API_SHEET,
		range: 'Afiliados!A1',
		resource: {
			values: [
				[brand, fname, lname, cpf, whats, email]
			]
		},
		valueInputOption: 'raw'
	}
	const config = {
		headers: {
			'Content-type': 'application/json',
			'Authorization': process.env.GOOGLE_API_TOKEN
		}
	}
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await post(url, body, config)
			try {
				const { user } = await auth.createUserWithEmailAndPassword(email, pass)
				try {
					await auth.currentUser.sendEmailVerification({ url: `${process.env.CONTINUE_URL}` })
					try {
						await db.collection('affiliates').add({
							user: user.uid, brand, fname, lname, cpf, whats, email
						})
						try {
							await auth.signOut() // user needs to validate email before signing in to app
						} catch (error) {
							console.log(error)
							if (error.response) console.log(error.response)
							reject('Erro ao fazer signOut')
						}
					} catch (error) {
						console.log(error)
						if (error.response) console.log(error.response)
						reject('Erro ao salvar na Firestore')
					}
				} catch (error) {
					console.log(error)
					if (error.response) console.log(error.response)
					reject('Erro ao enviar email de verificação')
				}
			} catch (error) {
				console.log(error)
				if (error.code) {
					switch (error.code) {
						case 'auth/network-request-failed': throw { msg: 'Sem conexão com a rede', customError: true }
						case 'auth/invalid-email': throw { msg: 'Email inválido', customError: true }
						case 'auth/email-already-in-use': throw { msg: 'Email já cadastrado', customError: true }
						case 'auth/operation-not-allowed': throw { msg: 'Operação não permitida', customError: true }
						case 'auth/weak-password': throw { msg: 'Senha fraca. Mínimo 6 caracteres', customError: true }
					}
				}
				reject('Erro ao criar usuário')
			}
			window.location.assign('/confirmar-email')
		} catch (error) {
			if (error.customError) reject(error)
			else {
				console.log(error)
				if (error.response) console.log(error.response)
				reject('Erro ao salvar afiliado na planilha')
			}
		}
	})
}

export default sendToBackend