import { db } from '../../Firebase/index'
import { post } from 'axios'

const sendToBackend = state => () => {
	const { affiliateName, affiliateCpf, fname, lname, rg, cpf, birth, insta, cnpj, ie, razao, fantasia,
		rua, numero, complemento, bairro, cep, cidade, estado, fone, email, setFname, setLname, setRg, setCpf,
		setBirth, setInsta, setCnpj, setIe, setRazao, setFantasia, setRua, setNumero, setComplemento, setBairro,
		setCep, setCidade, setEstado, setFone, setEmail } = state
	const today = new Date()
	const url = process.env.SHEET_URL
	const body = {
		apiResource: 'values',
		apiMethod: 'append',
		spreadsheetId: process.env.SHEET_ID_REFER_APPEND,
		range: 'Indicados!A1',
		resource: {
			values: [
				[today, affiliateName, affiliateCpf, `${fname} ${lname}`, rg, cpf, birth, insta, cnpj, ie,
				razao, fantasia, `${rua}, ${numero}, ${complemento}`, bairro, cep, cidade, estado, fone, email]
			]
		},
		valueInputOption: 'raw'
	}
	const bodyLegacy = {
		apiResource: 'values',
		apiMethod: 'append',
		spreadsheetId: process.env.SHEET_ID_REFER_LEGACY,
		range: 'Clientes!A1',
		resource: {
			values: [
				[`${fname.toUpperCase()} ${lname.toUpperCase()}`,
				rg, cpf, cnpj, ie, razao, fantasia,
				complemento ? `${rua}, ${numero}, ${complemento}` : `${rua}, ${numero}`,
				bairro, cep, cidade, estado, fone.replace(' ',''), email, ,
				today.toLocaleString('en-GB').replace(',',''), today.getMonth() + 1, today.getFullYear(),
				'ativo', , , affiliateName.toUpperCase(), affiliateCpf]
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
			await post(url, body, config)
			try {
				await post(url, bodyLegacy, config)
				try {
					await db.collection('storeowners').add({
						cadastro: new Date(), affiliateName, affiliateCpf, storeowner: `${fname} ${lname}`, rg, cpf,
						birth, insta, cnpj, ie, razao, fantasia, endereco: `${rua}, ${numero}, ${complemento}`,
						bairro, cep, cidade, estado, fone, email
					})
				} catch (error) {
					console.log(error)
					if (error.response) console.log(error.response)
					throw 'Erro ao salvar na Firestore'
				}
			} catch (error) {
				console.log(error)
				if (error.response) console.log(error.response)
				throw error
			}
			// clear all fields after submission
			setFname('')
			setLname('')
			setRg('')
			setCpf('')
			setBirth('')
			setInsta('')
			setCnpj('')
			setIe('')
			setRazao('')
			setFantasia('')
			setRua('')
			setNumero('')
			setComplemento('')
			setBairro('')
			setCep('')
			setCidade('')
			setEstado('')
			setFone('')
			setEmail('')
			// resolve Promise with message to user
			resolve('Lojista indicado com sucesso!')
		} catch (error) {
			console.log(error)
			if (error.response) console.log(error.response)
			reject(error)
		}
	})
}

export default sendToBackend