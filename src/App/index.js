import React, { useState, useEffect } from 'react'
import { auth, db } from '../Firebase/index'
import { userContext } from './appContext'
import ErrorBoundary from '@bit/vitorbarbosa19.ziro.error-boundary'
import Router from './Router'

export const App = () => {
	const [errorLoading, setErrorLoading] = useState(false)
	const [uid, setUid] = useState('')
	const [name, setName] = useState('')
	const [cpf, setCpf] = useState('')
	useEffect(() => {
		return auth.onAuthStateChanged(async user => {
			if (user && user.emailVerified) setUid(user.uid)
			else setUid('')
		})
	}, [])
	useEffect(() => {
		const getUserData = async () => {
			if (uid) {
				try {
					const docRef = await db.collection('affiliates').where('uid','==',uid).get()	
					if (!docRef.empty) {
						docRef.forEach(doc => {
							const data = doc.data()
							setName(`${data.fname} ${data.lname}`)
							setCpf(data.cpf)
						})
					} else setErrorLoading(true)
				} catch (error) {
					if (error.response) console.log(error.response)
					else console.log(error)
					setErrorLoading(true)	
				}
			}
		}
		getUserData()
	}, [uid])
	const userData = { uid, name, cpf }
	if (errorLoading) return <div>Erro na página. Tente novamente ou solicite suporte</div>
	return (
		<ErrorBoundary>
			<userContext.Provider value={userData}>
				<Router isLogged={!!uid} />
			</userContext.Provider>
		</ErrorBoundary>
	)
}