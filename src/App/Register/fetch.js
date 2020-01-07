import axios from 'axios'

const fetch = (setBrands, setBrandsAndBranches) => {
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
			const brands = dataWithoutHeaderRow.map(value => {
				const [brand, ...rest] = value
				return brand
			})
			const branches = dataWithoutHeaderRow.map(value => {
				const [brand, , ...addresses] = value
				let fullAddresses = []
				for (let i = 0; i < addresses.length; i++) {
					if (i % 2 === 0)
						fullAddresses.push(`${brand} - ${addresses[i]}, ${addresses[i + 1]}`)
				}
				return fullAddresses
			}).flat()
			setBrands(brands)
			setBrandsAndBranches(branches)
		} catch (error) {
			if (error.response) console.log(error.response)
			else console.log(error)
		}
	}
	run()
}

export default fetch