import React from 'react'
import { useLocation } from 'wouter'
import routeMatcher from '@ziro/router'
import Login from './Login/index'
import NotFound from '@bit/vitorbarbosa19.ziro.not-found'

const Router = () => {
	const [location] = useLocation()
	const isLogged = false
	const publicRoutes = {
		'/home': <div>Home</div>,
		'/login': <Login />
	}
	const privateRoutes = {
		'/dashboard': <div>Dashboard</div>
	}
	return routeMatcher(location, isLogged, publicRoutes, privateRoutes, <NotFound fallback='/home' />)
}

export default Router