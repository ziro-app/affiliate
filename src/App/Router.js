import React from 'react'
import PropTypes from 'prop-types'
import routeMatcher from '@ziro/router'
import Login from './Login/index'
import Register from './Register/index'
import AccessProblems from './AccessProblems/index'
import EmailResend from './EmailResend/index'
import PasswordReset from './PasswordReset/index'
import EmailConfirmation from './EmailConfirmation/index'
import { Menu } from './Menu/index'
import ReferClient from './ReferClient/index'
import MyAccount from '@bit/vitorbarbosa19.ziro.my-account'
import About from '@bit/vitorbarbosa19.ziro.about'
import UpdateEmail from '@bit/vitorbarbosa19.ziro.update-email'
import UpdatePass from '@bit/vitorbarbosa19.ziro.update-pass'
import Reauthenticate from '@bit/vitorbarbosa19.ziro.reauthenticate'
import DeleteAccount from '@bit/vitorbarbosa19.ziro.delete-account'
import NotFound from '@bit/vitorbarbosa19.ziro.not-found'

const Router = ({ isLogged }) => {
	const publicRoutes = {
		'/login': <Login />,
		'/cadastrar': <Register />,
		'/problemas-acesso': <AccessProblems />,
		'/reenviar-email': <EmailResend />,
		'/resetar-senha': <PasswordReset />,
		'/confirmar-email': <EmailConfirmation />
	}
	const privateRoutes = { // Menu can't be put inside the components because then it'll unmount on transition
		'/indicar': <Menu title='Indicar Lojista'><ReferClient /></Menu>,
		'/conta': <Menu title='Minha Conta'><MyAccount /></Menu>,
		'/ziro': <Menu title='Sobre a Ziro'><About /></Menu>,
		'/trocar-email': <UpdateEmail />,
		'/trocar-senha': <UpdatePass />,
		'/reautenticar': <Reauthenticate />,
		'/deletar-conta': <DeleteAccount />
	}
	const homeRoute = '/indicar'
	return routeMatcher(isLogged, publicRoutes, privateRoutes, homeRoute, <NotFound fallback='/' />)
}

Router.propTypes = {
	isLogged: PropTypes.bool.isRequired
}

export default Router