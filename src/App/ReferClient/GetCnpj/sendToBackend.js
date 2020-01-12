import axios from 'axios'

const sendToBackend = state => () => {
	const { cnpj, setRazao, setFantasia, setRua, setNumero,
		setComplemento, setBairro, setCep, setCidade, setEstado, setFone, setEmail } = state
	const config = {
		method: 'POST',
		url: process.env.CNPJ_URL,
		data: { cnpj },
		headers: {
			'Authorization': process.env.CNPJ_TOKEN
		}
	}
	return new Promise(async (resolve, reject) => {
		try {
			const { data: { result } } = await axios(config)
			// fill form fields to save time for user
			setRazao(result.nome)
			setFantasia(result.fantasia)
			setRua(result.logradouro)
			setNumero(result.numero)
			setComplemento(result.complemento)
			setBairro(result.bairro)
			setCep(result.cep)
			setCidade(result.municipio)
			setEstado(result.uf)
			setFone(result.telefone)
			setEmail(result.email)
			// resolve
			resolve('CNPJ válido')
		} catch (error) {
			if (error.response) console.log(error.response)
			else console.log(error)
			// clear all fields
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
			// reject
			reject('CNPJ inválido')
		}
	})
}

export default sendToBackend