import React, { useState } from 'react'
import PropTypes from 'prop-types'
import HeaderHome from '@bit/vitorbarbosa19.ziro.header-home'
import Form from '@bit/vitorbarbosa19.ziro.form'
import FormInput from '@bit/vitorbarbosa19.ziro.form-input'
import InputText from '@bit/vitorbarbosa19.ziro.input-text'
import { containerWithPadding } from '@ziro/theme'
import { welcome, marker } from './styles'

const Register = ({ sendToBackend }) => {
	const [brand, setBrand] = useState('') // add support for different branches
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [cpf, setCpf] = useState('')
	const [whats, setWhats] = useState('')
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const state = { brand, fname, lname, cpf, whats, email, pass, confirmPass,
		setBrand, setFname, setLname, setCpf, setWhats, setEmail, setPass, setConfirmPass }
	return (
		<div style={containerWithPadding}>
			<HeaderHome linkPath='/login' linkText='Tem cadastro? LOGIN' />
			<h1 style={welcome}>
				Crie sua conta<br/>
				de <span style={marker}>afiliado</span>,
			</h1>
		</div>
	)
}

Register.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default Register

	// const validations = [
	// 	{
	// 		name: 'email',
	// 		validation: value => /^\S+@\S+\.\S+$/g.test(value), // tests for pattern a@b.c
	// 		value: email,
	// 		message: 'Formato inválido'
	// 	},
	// 	{
	// 		name: 'pass',
	// 		validation: value => !/^.{0,5}$/g.test(value), // tests for min length of 6 char
	// 		value: pass,
	// 		message: 'Mínimo 6 caracteres'
	// 	}
	// ]
		// <Form
		// 	validations={validations}
		// 	sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
		// 	inputs={[
		// 		<FormInput name='email' label='Email' input={
		// 			<InputText
		// 				value={email}
		// 				onChange={({ target: { value } }) => setEmail(value)}
		// 				placeholder='Seu email'
		// 			/>
		// 		}/>,
		// 		<FormInput name='pass' label='Senha' input={
		// 			<InputText
		// 				value={pass}
		// 				onChange={({ target: { value } }) => setPass(value)}
		// 				placeholder='Sua senha'
		// 			/>
		// 		}/>
		// 	]}
		// />