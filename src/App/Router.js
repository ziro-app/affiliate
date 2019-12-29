import React from 'react'
import routeMatcher from '@ziro/router'
import Login from './Login/index'
import Register from './Register/index'
import NotFound from '@bit/vitorbarbosa19.ziro.not-found'

const Router = () => {
	const isLogged = false
	const publicRoutes = {
		'/login': <Login />,
		'/cadastrar': <Register />
	}
	const privateRoutes = {
		'/dashboard': <div>Dashboard</div>
	}
	const homeRoute = '/dashboard'
	return routeMatcher(isLogged, publicRoutes, privateRoutes, homeRoute, <NotFound fallback='/' />)
}

export default Router