import axios from 'axios'

const fetch = setBrands => {
	const run = async () => {
		const config = {
			method: 'POST',
			url: process.env.SHEET_URL,
			data: {
				apiResource: 'values',
				apiMethod: 'get',
				spreadsheetId: process.env.SHEET_ID_REGISTER_GET,
				range: 'Dados!W:AJ'
			},
			headers: {
				'Authorization': process.env.SHEET_TOKEN,
				'Content-Type': 'application/json'
			}
		}
		try {
			const { data: { values } } = await axios(config)
			const [, ...dataWithoutHeaderRow] = values
			const brandsAndAddresses = dataWithoutHeaderRow.map(value => {
				const [brand, , ...addresses] = value
				let fullAddresses = []
				for (let i = 0; i < addresses.length; i++) {
					if (i % 2 === 0)
						fullAddresses.push(`${brand} - ${addresses[i]}, ${addresses[i + 1]}`)
				}
				return fullAddresses
			}).flat()
			setBrands(brandsAndAddresses)
		} catch (error) {
			if (error.response) console.log(error.response)
			else console.log(error)
		}
	}
	run()
}

export default fetch