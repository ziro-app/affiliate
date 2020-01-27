import { auth } from '../../Firebase/index'

const sendToBackend = state => () => {
	const { email, pass } = state
	return new Promise(async (resolve, reject) => {
		try {
			const { user: { emailVerified } } = await auth.signInWithEmailAndPassword(email, pass)
			if (!emailVerified) {
				await auth.signOut()
				reject({ msg: 'Acesse o email de confirmação', customError: true })
			}
		} catch (error) {
			console.log(error)
			if (error.code) {
				switch (error.code) {
					case 'auth/network-request-failed': reject({ msg: 'Sem conexão com a rede', customError: true })
					case 'auth/invalid-email': reject({ msg: 'Email inválido', customError: true })
					case 'auth/user-disabled': reject({ msg: 'Usuário bloqueado', customError: true })
					case 'auth/user-not-found': reject({ msg: 'Usuário não cadastrado', customError: true })
					case 'auth/wrong-password': reject({ msg: 'Senha incorreta', customError: true })
					case 'auth/too-many-requests': reject({ msg: 'Muitas tentativas. Tente mais tarde', customError: true })
				}
			}
		}
	})
}

export default sendToBackend