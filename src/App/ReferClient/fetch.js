import axios from 'axios'

const fetch = (setIsLoading, setIsError) => {
	const source = axios.CancelToken.source()
	const run = async () => {
		// const config = {
		// 	method: 'POST',
		// 	url: process.env.SHEET_URL,
		// 	data: {
		// 		apiResource: 'values',
		// 		apiMethod: 'get',
		// 		spreadsheetId: process.env.SHEET_ID_REGISTER_GET,
		// 		range: 'Dados!W:AJ'
		// 	},
		// 	headers: {
		// 		'Authorization': process.env.SHEET_TOKEN,
		// 		'Content-Type': 'application/json'
		// 	},
		// 	cancelToken: source.token
		// }
		try {
			// const { data: { values } } = await axios(config)
			// setBrands(brands)
			// setBrandsAndBranches(branches)
		} catch (error) {
			if (error.response) console.log(error.response)
			else console.log(error)
			setIsError(true)
		} finally {
			setIsLoading(false)
		}
	}
	run()
	return () => source.cancel('Canceled fetch request. Component unmounted')
}

export default fetch