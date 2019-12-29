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
					await db.collection('affiliates').add({
						user: user.uid, brand, fname, lname, cpf, whats, email
					})
				} catch (error) {
					console.log(error)
					if (error.response) console.log(error.response)
					reject('Erro ao salvar na Firestore')
				}
			} catch (error) {
				console.log(error)
				if (error.response) console.log(error.response)
				reject('Erro ao criar usuário')
			}
			resolve('Você registrou-se como afiliado!')
		} catch (error) {
			console.log(error)
			if (error.response) console.log(error.response)
			reject('Erro ao salvar afiliado na planilha')
		}
	})
}

export default sendToBackend

// if (sellerId instanceof Array && sellerId[1]) {
// 	const docRef = await db.collection('credit-card-payments').add({
// 		seller,
// 		sellerZoopId: sellerId[1],
// 		charge,
// 		maxInstallments,
// 		status: 'Aguardando Pagamento'
// 	})
// 	setSeller('')
// 	setCharge('')
// 	setMaxInstallments('')
// 	try {
// 		const doc = await docRef.get()
// 		if (doc) await navigator.clipboard.writeText(`${baseUrl}${doc.id}`)
// 	} catch (error) {
// 		console.log(error)
// 		reject('Error in clipboard API')
// 	}
// 	resolve('Link copiado')
// } reject('Seller not found in database')