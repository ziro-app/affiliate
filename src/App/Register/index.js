import React, { useState } from 'react'
import PropTypes from 'prop-types'
import maskInput from '@ziro/mask-input'
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
	const validations = [
		{
			name: 'brand',
			validation: value => !!value,
			value: brand,
			message: 'Marca inválida'
		},{
			name: 'fname',
			validation: value => !!value,
			value: fname,
			message: 'Campo obrigatório'
		},{
			name: 'lname',
			validation: value => !!value,
			value: lname,
			message: 'Campo obrigatório'
		},{
			name: 'cpf',
			validation: value => value.length >= 14,
			value: cpf,
			message: 'Formato inválido'
		},{
			name: 'whats',
			validation: value => value.length >= 14,
			value: whats,
			message: 'Formato inválido'
		},{
			name: 'email',
			validation: value => /^\S+@\S+\.\S+$/g.test(value), // tests for pattern a@b.c
			value: email,
			message: 'Formato inválido'
		},{
			name: 'pass',
			validation: value => !/^.{0,5}$/g.test(value), // tests for min length of 6 char
			value: pass,
			message: 'Mínimo 6 caracteres'
		},{
			name: 'confirmPass',
			validation: value => value === pass,
			value: confirmPass,
			message: 'Deve ser igual ao campo anterior'
		}
	]
	return (
		<div style={containerWithPadding}>
			<HeaderHome linkPath='/login' linkText='Tem cadastro? LOGIN' />
			<h1 style={welcome}>
				Crie sua conta de <span style={marker}>afiliado</span>,
			</h1>
			<Form
				validations={validations}
				sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
				inputs={[
					<FormInput name='brand' label='Marca' input={
						<InputText
							value={brand}
							onChange={({ target: { value } }) => setBrand(value)}
							placeholder='Marca onde trabalha'
						/>
					}/>,
					<FormInput name='fname' label='Nome' input={
						<InputText
							value={fname}
							onChange={({ target: { value } }) => setFname(value)}
							placeholder='Seu primeiro nome'
						/>
					}/>,
					<FormInput name='lname' label='Sobrenome' input={
						<InputText
							value={lname}
							onChange={({ target: { value } }) => setLname(value)}
							placeholder='Seu sobrenome'
						/>
					}/>,
					<FormInput name='cpf' label='CPF' input={
						<InputText
							value={cpf}
							onChange={({ target: { value } }) => setCpf(maskInput(value, '###.###.###-##', true))}
							placeholder='000.111.222-33'
						/>
					}/>,
					<FormInput name='whats' label='Whatsapp' input={
						<InputText
							value={whats}
							onChange={({ target: { value } }) => setWhats(maskInput(value, '(##) #####-####', true))}
							placeholder='(11) 91122-3344'
						/>
					}/>,
					<FormInput name='email' label='Email' input={
						<InputText
							value={email}
							onChange={({ target: { value } }) => setEmail(value)}
							placeholder='Para acesso ao app'
						/>
					}/>,
					<FormInput name='pass' label='Senha' input={
						<InputText
							value={pass}
							onChange={({ target: { value } }) => setPass(value)}
							placeholder='Mínimo 6 caracteres'
						/>
					}/>,
					<FormInput name='confirmPass' label='Confirme a senha' input={
						<InputText
							value={confirmPass}
							onChange={({ target: { value } }) => setConfirmPass(value)}
							placeholder='Mínimo 6 caracteres'
						/>
					}/>
				]}
			/>			
		</div>
	)
}

Register.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default Register