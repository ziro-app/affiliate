import axios from 'axios'

const fetch = () => {
	const config = {
		method: 'POST',
		url: process.env.SHEET_URL,
		data: {
			apiResource: 'values',
			apiMethod: 'get',
			spreadsheetId: process.env.SHEET_ID_REGISTER_GET,
			range: 'Dados!W:W'
		},
		headers: {
			'Authorization': process.env.SHEET_TOKEN,
			'Content-Type': 'application/json'
		}
	}
	const runFetch = async () => {
		try {
			const { data } = await axios(config)
			console.log(data)
		} catch (error) {
			console.log(error.response)
		}
	}
	runFetch()
}

export default fetch