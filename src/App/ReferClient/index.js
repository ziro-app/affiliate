import React, { useState } from 'react'
import sendToBackend from './sendToBackend'
import maskInput from '@ziro/mask-input'
import HeaderHome from '@bit/vitorbarbosa19.ziro.header-home'
import Form from '@bit/vitorbarbosa19.ziro.form'
import FormInput from '@bit/vitorbarbosa19.ziro.form-input'
import InputText from '@bit/vitorbarbosa19.ziro.input-text'
import { containerWithPadding } from '@ziro/theme'
import { bottom } from './styles'

const ReferClient = () => {
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [rg, setRg] = useState('')
	const [cpf, setCpf] = useState('')
	const [cnpj, setCnpj] = useState('')
	const [ie, setIe] = useState('')
	const [razao, setRazao] = useState('')
	const [fantasia, setFantasia] = useState('')
	const [endereco, setEndereco] = useState('')
	const [bairro, setBairro] = useState('')
	const [cep, setCep] = useState('')
	const [cidade, setCidade] = useState('')
	const [estado, setEstado] = useState('')
	const [fone, setFone] = useState('')
	const [email, setEmail] = useState('')
	const state = { fname, lname, rg, cpf, cnpj, ie, razao, fantasia, endereco, bairro, cep, cidade, estado, fone, email,
		setFname, setLname, setRg, setCpf, setCnpj, setIe, setRazao, setFantasia, setEndereco, setBairro, setCep, setCidade, setEstado, setFone, setEmail }
	const validations = [
		{
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
			name: 'rg',
			validation: value => !!value,
			value: rg,
			message: 'Campo obrigatório'
		},{
			name: 'cpf',
			validation: value => value.length >= 14,
			value: cpf,
			message: 'Formato inválido'
		},{
			name: 'cnpj',
			validation: value => value.length >= 14, // <---
			value: cnpj,
			message: 'Formato inválido'
		},{
			name: 'ie',
			validation: value => !!value,
			value: ie,
			message: 'Campo obrigatório'
		},{
			name: 'razao',
			validation: value => !!value,
			value: razao,
			message: 'Campo obrigatório'
		},{
			name: 'endereco',
			validation: value => !!value,
			value: endereco,
			message: 'Campo obrigatório'
		},{
			name: 'bairro',
			validation: value => !!value,
			value: bairro,
			message: 'Campo obrigatório'
		},{
			name: 'cep',
			validation: value => !!value, // <---
			value: cep,
			message: 'Formato inválido'
		},{
			name: 'cidade',
			validation: value => !!value,
			value: cidade,
			message: 'Campo obrigatório'
		},{
			name: 'estado',
			validation: value => !!value, // <--
			value: estado,
			message: 'Campo obrigatório'
		},{
			name: 'fone',
			validation: value => value.length >= 14,
			value: fone,
			message: 'Formato inválido'
		},{
			name: 'email',
			validation: value => /^\S+@\S+\.\S+$/g.test(value), // tests for pattern a@b.c
			value: email,
			message: 'Formato inválido'
		}
	]
	return (
		<>
			<Form
				validations={validations}
				sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
				inputs={[
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
					<FormInput name='fone' label='Telefone' input={
						<InputText
							value={fone}
							onChange={({ target: { value } }) => setFone(maskInput(value, '(##) #####-####', true))}
							placeholder='(11) 91122-3344'
						/>
					}/>,
					<FormInput name='email' label='Email' input={
						<InputText
							value={email}
							onChange={({ target: { value } }) => setEmail(value)}
							placeholder='joao@gmail.com'
						/>
					}/>
				]}
			/>
			<div style={bottom}></div>
		</>
	)
}

export default ReferClient