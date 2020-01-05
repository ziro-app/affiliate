import { db } from '../../Firebase/index'
import { post } from 'axios'

const sendToBackend = state => () => {
	const { affiliateName, affiliateCpf, fname, lname, rg, cpf, cnpj, ie, razao, fantasia, rua, numero,
		complemento, bairro, cep, cidade, estado, fone, email, setFname, setLname, setRg, setCpf, setCnpj, setIe,
		setRazao, setFantasia, setRua, setNumero, setComplemento, setBairro, setCep, setCidade, setEstado, setFone, setEmail } = state
	const url = process.env.SHEET_URL
	const body = {
		apiResource: 'values',
		apiMethod: 'append',
		spreadsheetId: process.env.SHEET_ID_REFER_APPEND,
		range: 'Indicados!A1',
		resource: {
			values: [
				[new Date(), affiliateName, affiliateCpf, `${fname} ${lname}`, rg, cpf, cnpj, ie, razao, fantasia,
				`${rua}, ${numero}, ${complemento}`, bairro, cep, cidade, estado, fone, email]
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
			await post(url, body, config)
			try {
				await db.collection('storeowners').add({
					cadastro: new Date(), affiliateName, affiliateCpf, storeowner: `${fname} ${lname}`, rg, cpf,
					cnpj, ie, razao, fantasia, endereco: `${rua}, ${numero}, ${complemento}`, bairro, cep, cidade,
					estado, fone, email
				})
			} catch (error) {
				console.log(error)
				if (error.response) console.log(error.response)
				throw 'Erro ao salvar na Firestore'
			}
			// clear all fields after submission
			setFname('')
			setLname('')
			setRg('')
			setCpf('')
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
		} catch (error) {
			console.log(error)
			if (error.response) console.log(error.response)
			reject(error)
		}
	})
}

export default sendToBackend