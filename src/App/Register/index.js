import React, { useState, useEffect } from 'react'
import fetch from './fetch'
import sendToBackend from './sendToBackend'
import maskInput from '@ziro/mask-input'
import capitalize from '@ziro/capitalize'
import InitialLoader from '@bit/vitorbarbosa19.ziro.initial-loader'
import Error from '@bit/vitorbarbosa19.ziro.error'
import HeaderHome from '@bit/vitorbarbosa19.ziro.header-home'
import Form from '@bit/vitorbarbosa19.ziro.form'
import FormInput from '@bit/vitorbarbosa19.ziro.form-input'
import Dropdown from '@bit/vitorbarbosa19.ziro.dropdown'
import InputText from '@bit/vitorbarbosa19.ziro.input-text'
import { containerWithPadding } from '@ziro/theme'
import { welcome, marker } from './styles'

const Register = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	// dropdown options
	const [brandsAndBranches, setBrandsAndBranches] = useState([])
	const [brands, setBrands] = useState([])
	const [branches, setBranches] = useState([])
	// form fields
	const [brand, setBrand] = useState('')
	const [branch, setBranch] = useState('')
	const [insta, setInsta] = useState('')
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [cpf, setCpf] = useState('')
	const [whats, setWhats] = useState('')
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const state = { brand, branch, insta, fname, lname, cpf, whats, email, pass }
	useEffect(() => fetch(setIsLoading, setIsError, setBrands, setBrandsAndBranches), [])
	useEffect(() => {
		setBranch('')
		setBranches(brandsAndBranches
			.filter(value => value.split(' - ')[0] === brand)
			.map(value => value.split(' - ')[1].replace('Bom Retiro','B. Retiro')))
	}, [brand])
	const validations = [
		{
			name: 'brand',
			validation: value => !!value,
			value: brand,
			message: 'Marca inválida'
		},{
			name: 'branch',
			validation: value => !!value,
			value: branch,
			message: 'Unidade inválida'
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
	if (isLoading) return <InitialLoader />
	if (isError) return <Error />
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
						<Dropdown
							value={brand}
							onChange={({ target: { value } }) => setBrand(value)}
							list={brands}
							placeholder='Marca onde trabalha'
							onChangeKeyboard={element => element ? setBrand(element.value) : null }
						/>
					}/>,
					<FormInput name='branch' label='Unidade da Marca' input={
						<Dropdown
							value={branch}
							onChange={({ target: { value } }) => setBranch(value)}
							list={branches || ['Escolha uma marca acima']}
							placeholder='Unidade/endereço da marca'
							onChangeKeyboard={element => element ? setBranch(element.value) : null }
						/>
					}/>,
					<FormInput name='insta' label='Instagram da Marca' input={
						<InputText
							value={insta}
							onChange={({ target: { value } }) => setInsta(value)}
							placeholder='Ex.: ateliederoupa. Não use .com'
						/>
					}/>,
					<FormInput name='fname' label='Nome' input={
						<InputText
							value={fname}
							onChange={({ target: { value } }) => setFname(capitalize(value))}
							placeholder='Seu primeiro nome'
						/>
					}/>,
					<FormInput name='lname' label='Sobrenome' input={
						<InputText
							value={lname}
							onChange={({ target: { value } }) => setLname(capitalize(value))}
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
							onChange={({ target: { value } }) => setEmail(value.toLowerCase())}
							placeholder='Para acesso ao app'
						/>
					}/>,
					<FormInput name='pass' label='Senha' input={
						<InputText
							value={pass}
							onChange={({ target: { value } }) => setPass(value)}
							placeholder='Mínimo 6 caracteres'
							type='password'
						/>
					}/>,
					<FormInput name='confirmPass' label='Confirme a senha' input={
						<InputText
							value={confirmPass}
							onChange={({ target: { value } }) => setConfirmPass(value)}
							placeholder='Igual ao campo anterior'
							type='password'
						/>
					}/>
				]}
			/>
		</div>
	)
}

export default Register