import React from 'react'
import HeaderHome from '@bit/vitorbarbosa19.ziro.header-home'
import { containerWithPadding } from '@ziro/theme'
import { welcome, marker } from './styles'

const Register = () =>
	<div style={containerWithPadding}>
		<HeaderHome linkPath='/login' linkText='Tem cadastro? LOGIN' />
		<h1 style={welcome}>
			Crie sua conta<br/>
			de <span style={marker}>afiliado</span>,
		</h1>
	</div>

export default Register