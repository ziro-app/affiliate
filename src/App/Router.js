import React from 'react'
import PropTypes from 'prop-types'
import routeMatcher from '@ziro/router'
import Login from './Login/index'
import Register from './Register/index'
import LoginTrouble from './LoginTrouble/index'
import EmailResend from './EmailResend/index'
import PasswordReset from './PasswordReset/index'
import EmailConfirmation from './EmailConfirmation/index'
import { Menu } from './Menu/index'
import ReferClient from './ReferClient/index'
import MyAccount from './MyAccount/index'
import About from '@bit/vitorbarbosa19.ziro.about'
import NotFound from '@bit/vitorbarbosa19.ziro.not-found'

const Router = ({ isLogged }) => {
	const publicRoutes = {
		'/login': <Login />,
		'/cadastrar': <Register />,
		'/problemas-acesso': <LoginTrouble />,
		'/reenviar-email': <EmailResend />,
		'/resetar-senha': <PasswordReset />,
		'/confirmar-email': <EmailConfirmation />
	}
	const privateRoutes = { // Menu can't be put inside the components because then it'll unmount on transition
		'/indicar': <Menu title='Indicar Lojista'><ReferClient /></Menu>,
		'/conta': <Menu title='Minha Conta'><MyAccount /></Menu>,
		'/ziro': <Menu title='Sobre a Ziro'><About /></Menu>
	}
	const homeRoute = '/indicar'
	return routeMatcher(isLogged, publicRoutes, privateRoutes, homeRoute, <NotFound fallback='/' />)
}

Router.propTypes = {
	isLogged: PropTypes.bool.isRequired
}

export default Router