import React, { useState, useEffect } from 'react'
import { auth, db } from '../Firebase/index'
import ErrorBoundary from '@bit/vitorbarbosa19.ziro.error-boundary'
import Router from './Router'

export const App = () => {
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
				const docRef = await db.collection('affiliates').where('uid','==',uid).get()	
				if (!docRef.empty) {
					docRef.forEach(doc => {
						const data = doc.data()
						setName(`${data.fname} ${data.lname}`)
						setCpf(data.cpf)
					})
				}
			}
		}
		getUserData()
	}, [uid])
	return (
		<ErrorBoundary>
			<Router isLogged={!!uid} />
		</ErrorBoundary>
	)
}