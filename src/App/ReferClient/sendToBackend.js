import React, { useContext } from 'react'
import { db } from '../../Firebase/index'
import { post } from 'axios'
import { dateHourFormatterUTC3 } from '../utils'
import { userContext } from '../appContext';

const sendToBackend = state => () => {
	const { advisor, salesman, fname, lname, rg, cpf, birth, insta, cnpj, ie, razao, fantasia,
		rua, numero, complemento, bairro, cep, cidade, estado, fone, whats, email, setSearchedName, setAffiliateName, setAffiliateCpf, setFname, setLname, setRg, setCpf,
		setAdvisor, setSalesman, setBirth, setInsta, setCnpj, setIe, setRazao, setFantasia, setRua, setNumero, setComplemento, setBairro,
		setCep, setCidade, setEstado, setFone, setWhats, setEmail, cnpjValid } = state
	const { name: affiliateName, cpf: affiliateCpf } = useContext(userContext)
	const cnpjInCollection = []
	const instaTrim = insta ? insta.replace('@', '').trim().toLowerCase() : ''
	const fnameTrim = fname ? fname.trim() : ''
	const lnameTrim = lname ? lname.trim() : ''
	const today = new Date()
	const url = process.env.SHEET_URL
	const body = {
		apiResource: 'values',
		apiMethod: 'append',
		spreadsheetId: process.env.SHEET_ID_REFER_APPEND,
		range: 'Base!A1',
		resource: {
			values: [
				[dateHourFormatterUTC3(today), `${fnameTrim} ${lnameTrim}`, whats, email.toLowerCase(), rg, cpf, birth, instaTrim,
					cnpj, ie, razao, fantasia, complemento ? `${rua}, ${numero}, ${complemento}` : `${rua}, ${numero}`, bairro, cep, cidade,
					estado, fone, affiliateName, affiliateCpf, 'NENHUM', 'NENHUM']
			]
		},
		valueInputOption: 'user_entered'
	}
	const config = {
		headers: {
			'Content-type': 'application/json',
			'Authorization': process.env.SHEET_TOKEN
		}
	}
	return new Promise(async (resolve, reject) => {
		try {
			if (cnpjValid) {
				const documents = await db.collection('storeowners').get()
				documents.forEach(document => {
					if (document.data().cnpj !== '')
						cnpjInCollection.push({ [document.data().cnpj]: document.id })
				});
				await post(url, body, config)
				try {
					const exists = cnpjInCollection.find(data => Object.keys(data).includes(cnpj))
					if (exists) {
						await db.collection('storeowners').doc(exists[cnpj]).update({
							nomeAfiliado: affiliateName,
							cpfAfiliado: affiliateCpf,
							fname: fnameTrim,
							lname: lnameTrim,
							rg,
							cpf,
							nascimento: birth,
							instagram: instaTrim,
							cnpj,
							ie,
							razao,
							fantasia,
							endereco: complemento ? `${rua}, ${numero}, ${complemento}` : `${rua}, ${numero}`,
							bairro,
							cep,
							cidade,
							estado,
							fone,
							whatsapp: whats,
							email: email.toLowerCase(),
							assessor: 'NENHUM',
							vendedor: 'NENHUM'
						})
					} else {
						await db.collection('storeowners').add({
							cadastro: today,
							nomeAfiliado: affiliateName,
							cpfAfiliado: affiliateCpf,
							fname: fnameTrim,
							lname: lnameTrim,
							rg,
							cpf,
							nascimento: birth,
							instagram: instaTrim,
							cnpj,
							ie,
							razao,
							fantasia,
							endereco: complemento ? `${rua}, ${numero}, ${complemento}` : `${rua}, ${numero}`,
							bairro,
							cep,
							cidade,
							estado,
							fone,
							whatsapp: whats,
							email: email.toLowerCase(),
							assessor: 'NENHUM',
							vendedor: 'NENHUM'
						})
					}
				} catch (error) {
					console.log(error)
					if (error.response) console.log(error.response)
					throw 'Erro ao salvar na Firestore'
				}
				// clear all fields after submission
				setSearchedName('')
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
				setWhats('')
				setEmail('')
				setAffiliateName('')
				setAffiliateCpf('')
				setAdvisor('')
				setSalesman('')
				// resolve Promise with message to user
				resolve('Lojista indicado com sucesso!')
			} else throw { msg: 'Cnpj não validado', customError: true }
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