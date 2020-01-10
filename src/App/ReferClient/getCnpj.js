import axios from 'axios'

const getCnpj = (setCnpj) => {
	const source = axios.CancelToken.source()
	const run = async () => {
		const config = {
			method: 'POST',
			url: process.env.CNPJ_URL,
			data: { cnpj: '28.026.371/0001-61' },
			headers: {
				'Authorization': process.env.CNPJ_TOKEN
			},
			cancelToken: source.token
		}
		try {
			const data = await axios(config)
			console.log(data)
			// setCnpj(list)
		} catch (error) {
			if (error.response) console.log(error.response)
			else console.log(error)
			// setIsError(true)
		} finally {
			// setIsLoading(false)
		}
	}
	run()
	return () => source.cancel('Canceled fetch request. Component unmounted')
}

export default getCnpj