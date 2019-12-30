import React, { useState, useEffect } from 'react'
import { auth } from '../Firebase/index'
import ErrorBoundary from '@bit/vitorbarbosa19.ziro.error-boundary'
import Router from './Router'

export const App = () => {
	const [user, setUser] = useState('')
	useEffect(() => {
		return auth.onAuthStateChanged(async user => {
			if (user && user.emailVerified) {
				console.log(user)
				setUser(user)
			}
		})
	}, [])
	return (
		<ErrorBoundary>
			<Router isLogged={!!user} />
		</ErrorBoundary>
	)
}