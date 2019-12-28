import React from 'react'
import HeaderHome from '@bit/vitorbarbosa19.ziro.header-home'
import { containerWithPadding } from '@ziro/theme'

const Register = () => {
	return (
		<div style={containerWithPadding}>
			<HeaderHome linkPath='/login' linkText='Tem cadastro? LOGIN' />
		</div>
	)
}

export default Register