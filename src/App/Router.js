import React from 'react'
import routeMatcher from '@ziro/router'
import NotFound from '@bit/vitorbarbosa19.ziro.not-found'

const Router = () => {
	const location = '/dashboard'
	const isLogged = false
	const publicRoutes = {
		'/home': <div>Home</div>,
		'/login': <div>Login</div>
	}
	const privateRoutes = {
		'/dashboard': <div>Dashboard</div>
	}
	return routeMatcher(location, isLogged, publicRoutes, privateRoutes, <NotFound />)
}

export default Router