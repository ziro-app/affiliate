import { auth, db } from '../../Firebase/index'
import { post } from 'axios'

const sendToBackend = state => () => {
	const { fname, lname, rg, cpf, cnpj, ie, razao, fantasia, rua, numero, complemento, bairro, cep, cidade, estado, fone, email,
		setFname, setLname, setRg, setCpf, setCnpj, setIe, setRazao, setFantasia, setRua, setNumero, setComplemento, setBairro,
		setCep, setCidade, setEstado, setFone, setEmail } = state
	const url = process.env.SHEET_URL
	const body = {
		apiResource: 'values',
		apiMethod: 'append',
		spreadsheetId: process.env.SHEET_ID_REFER_APPEND,
		range: 'Main!A1', // <-----CHANGE
		resource: {
			values: [
				[`${fname} ${lname}`, rg, cpf, cnpj, ie, razao, fantasia, `${rua}, ${numero}, ${complemento}`,
					bairro, cep, cidade, estado, fone, email]
			// "assessor",dateHoje,month,year,"status","motivo_inativacao","premium","cacador"
			]
		},
		valueInputOption: 'raw'
	}
	const config = {
		headers: {
			'Content-type': 'application/json',
			'Authorization': process.env.SHEET_TOKEN
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
							uid: user.uid, brand, fname, lname, cpf, whats, email
						})
						try {
							await auth.signOut() // user needs to validate email before signing in to app
						} catch (error) {
							console.log(error)
							if (error.response) console.log(error.response)
							throw 'Erro ao fazer signOut'
						}
					} catch (error) {
						console.log(error)
						if (error.response) console.log(error.response)
						throw 'Erro ao salvar na Firestore'
					}
				} catch (error) {
					console.log(error)
					if (error.response) console.log(error.response)
					throw 'Erro ao enviar email de verificação'
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
				throw 'Erro ao criar usuário'
			}
			window.location.assign('/confirmar-email')
		} catch (error) {
			if (error.customError) reject(error)
			else {
				console.log(error)
				if (error.response) console.log(error.response)
				reject(error)
			}
		}
	})
}

export default sendToBackend