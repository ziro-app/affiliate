import { fbauth, auth, db } from '../../Firebase/index'

const sendToBackend = state => () => new Promise(async (resolve, reject) => {
	try {
		const { pass } = state
		const user = auth.currentUser
		const credential = fbauth.EmailAuthProvider.credential(user.email, pass)
		await user.reauthenticateWithCredential(credential)
		try {
			const snapshot = await db.collection('affiliates').where('uid','==',user.uid).get()
			if (!snapshot.empty) {
				snapshot.forEach(async doc => {
					const userData = await db.collection('affiliates').doc(doc.id)
					await userData.delete()
				})
			} else throw 'User not found in Firestore'
			try {
				await user.delete()
				window.location.replace('/')
				await auth.signOut()
			} catch (error) {
				console.log(error)
				if (error.response) console.log(error.response)
				throw error
			}
		} catch (error) {
			console.log(error)
			if (error.response) console.log(error.response)
			throw error
		}
	} catch (error) {
		console.log(error)
		if (error.response) console.log(error.response)
		if (error.code) {
			switch (error.code) {
				case 'auth/network-request-failed': reject({ msg: 'Sem conexão com a rede', customError: true })
				case 'auth/wrong-password': reject({ msg: 'Senha incorreta', customError: true })
			}
		} else reject(error)
	}
})

export default sendToBackend