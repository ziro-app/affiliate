import { auth } from '../../Firebase/index'

const sendToBackend = state => () => new Promise(async (resolve, reject) => {
	try {
		const { email } = state
		await auth.sendPasswordResetEmail(email)
		resolve('Enviado com sucesso!')
	} catch (error) {
		console.log(error)
		if (error.response) console.log(error.response)
		else reject(error)
	}
})

export default sendToBackend