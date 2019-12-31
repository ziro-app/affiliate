import React from 'react'
import PropTypes from 'prop-types'
import routeMatcher from '@ziro/router'
import { Menu } from './Menu/index'
import Login from './Login/index'
import Register from './Register/index'
import EmailConfirmation from './EmailConfirmation/index'
import ReferClient from './ReferClient/index'
import MyAccount from './MyAccount/index'
import About from '@bit/vitorbarbosa19.ziro.about'
import NotFound from '@bit/vitorbarbosa19.ziro.not-found'

const Router = ({ isLogged }) => {
	const publicRoutes = {
		'/login': <Login />,
		'/cadastrar': <Register />,
		'/confirmar-email': <EmailConfirmation />
	}
	const privateRoutes = { // Menu can't be put inside the components because then it'll unmount on transition
		'/indicar': <Menu title='Indicar Lojista'><div>Indicar Lojista</div></Menu>,
		'/conta': <Menu title='Minha Conta'><div>Minha Conta</div></Menu>,
		'/ziro': <Menu title='Sobre a Ziro'><About /></Menu>
	}
	const homeRoute = '/indicar'
	return routeMatcher(isLogged, publicRoutes, privateRoutes, homeRoute, <NotFound fallback='/' />)
}

Router.propTypes = {
	isLogged: PropTypes.bool.isRequired
}

export default Router