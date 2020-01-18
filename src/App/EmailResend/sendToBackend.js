import { auth } from '../../Firebase/index'

const sendToBackend = state => () => new Promise(async (resolve, reject) => {
	try {
		const { email, pass } = state
		await auth.signInWithEmailAndPassword(email, pass)
		try {
			await auth.currentUser.sendEmailVerification({ url: `${process.env.CONTINUE_URL}` })	
		} catch (error) {
			throw error
		}
		resolve('ok')
	} catch (error) {
		console.log(error)
		if (error.response) console.log(error.response)
		if (error.code) {
			switch (error.code) {
				case 'auth/network-request-failed': reject({ msg: 'Sem conexão com a rede', customError: true })
				case 'auth/invalid-email': reject({ msg: 'Email inválido', customError: true })
				case 'auth/user-disabled': reject({ msg: 'Usuário bloqueado', customError: true })
				case 'auth/user-not-found': reject({ msg: 'Usuário não cadastrado', customError: true })
				case 'auth/wrong-password': reject({ msg: 'Senha incorreta', customError: true })
				case 'auth/too-many-requests': reject({ msg: 'Muitas tentativas. Tente mais tarde', customError: true })
			}
		} else reject(error)
	}
})

export default sendToBackend