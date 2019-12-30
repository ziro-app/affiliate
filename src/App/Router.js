import React from 'react'
import PropTypes from 'prop-types'
import routeMatcher from '@ziro/router'
import Login from './Login/index'
import Register from './Register/index'
import EmailConfirmation from './EmailConfirmation/index'
import ReferClient from './ReferClient/index'
import MyAccount from './MyAccount/index'
import About from './About/index'
import NotFound from '@bit/vitorbarbosa19.ziro.not-found'

const Router = ({ isLogged }) => {
	const publicRoutes = {
		'/login': <Login />,
		'/cadastrar': <Register />,
		'/confirmar-email': <EmailConfirmation />
	}
	const privateRoutes = {
		'/indicar': <ReferClient />,
		'/conta': <MyAccount />,
		'/ziro': <About />
	}
	const homeRoute = '/indicar'
	return routeMatcher(isLogged, publicRoutes, privateRoutes, homeRoute, <NotFound fallback='/' />)
}

Router.propTypes = {
	isLogged: PropTypes.bool.isRequired
}

export default Router