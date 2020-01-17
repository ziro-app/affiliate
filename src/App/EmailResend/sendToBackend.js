import { auth } from '../../Firebase/index'

const sendToBackend = state => () => new Promise(async (resolve, reject) => {
	try {
		console.log(auth.currentUser)
		// await auth.currentUser.sendEmailVerification({ url: `${process.env.CONTINUE_URL}` })
		resolve('ok')
	} catch (error) {
		console.log(error)
		if (error.response) console.log(error.response)
		reject(error)
	}
})

export default sendToBackend