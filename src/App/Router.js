import React from 'react'
import routeMatcher from '@ziro/router'
import Login from './Login/index'
import Register from './Register/index'
import EmailConfirmation from './EmailConfirmation/index'
import NotFound from '@bit/vitorbarbosa19.ziro.not-found'

const Router = () => {
	const isLogged = false
	const publicRoutes = {
		'/login': <Login />,
		'/cadastrar': <Register />,
		'/confirmar-email': <EmailConfirmation />
	}
	const privateRoutes = {
		'/indicar': <div>Indicação de clientes</div>
	}
	const homeRoute = '/indicar'
	return routeMatcher(isLogged, publicRoutes, privateRoutes, homeRoute, <NotFound fallback='/' />)
}

export default Router