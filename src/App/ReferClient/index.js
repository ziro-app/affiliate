import React, { useState, useEffect, useContext } from 'react'
import fetch from './fetch'
import { userContext } from '../appContext'
import sendToBackend from './sendToBackend'
import maskInput from '@ziro/mask-input'
import capitalize from '@ziro/capitalize'
import Spinner from '@bit/vitorbarbosa19.ziro.spinner'
import Error from '@bit/vitorbarbosa19.ziro.error'
import GetCnpj from './GetCnpj/index'
import Form from '@bit/vitorbarbosa19.ziro.form'
import FormInput from '@bit/vitorbarbosa19.ziro.form-input'
import InputText from '@bit/vitorbarbosa19.ziro.input-text'
import Footer from '@bit/vitorbarbosa19.ziro.footer'

const ReferClient = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [cnpjValid, setCnpjValid] = useState(false)
	const [storeowners, setStoreowners] = useState([])
	// form fields
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [rg, setRg] = useState('')
	const [cpf, setCpf] = useState('')
	const [birth, setBirth] = useState('')
	const [insta, setInsta] = useState('')
	const [cnpj, setCnpj] = useState('')
	const [ie, setIe] = useState('')
	const [razao, setRazao] = useState('')
	const [fantasia, setFantasia] = useState('')
	const [rua, setRua] = useState('')
	const [numero, setNumero] = useState('')
	const [complemento, setComplemento] = useState('')
	const [bairro, setBairro] = useState('')
	const [cep, setCep] = useState('')
	const [cidade, setCidade] = useState('')
	const [estado, setEstado] = useState('')
	const [fone, setFone] = useState('')
	const [email, setEmail] = useState('')
	const { name: affiliateName, cpf: affiliateCpf } = useContext(userContext)
	const setState = { setFname, setLname, setRg, setCpf, setBirth, setInsta, setCnpj, setIe, setRazao, setFantasia,
		setRua, setNumero, setComplemento, setBairro, setCep, setCidade, setEstado, setFone, setEmail }
	const state = { affiliateName, affiliateCpf, fname, lname, rg, cpf, birth, insta, cnpj, ie, razao, fantasia,
		rua, numero, complemento, bairro, cep, cidade, estado, fone, email, ...setState, cnpjValid }
	useEffect(() => fetch(setIsLoading, setIsError, setStoreowners), [])
	useEffect(() => setCnpjValid(false), [cnpj])
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
		},
		// {
		// 	name: 'rg',
		// 	validation: value => !!value,
		// 	value: rg,
		// 	message: 'Campo obrigatório'
		// },{
		// 	name: 'cpf',
		// 	validation: value => value.length === 14,
		// 	value: cpf,
		// 	message: 'Formato inválido'
		// },{
		// 	name: 'birth',
		// 	validation: value => value.length === 10,
		// 	value: birth,
		// 	message: 'Formato inválido'
		// },
		{
			name: 'razao',
			validation: value => !!value,
			value: razao,
			message: 'Campo obrigatório'
		},{
			name: 'fantasia',
			validation: value => !!value,
			value: fantasia,
			message: 'Campo obrigatório'
		},{
			name: 'rua',
			validation: value => !!value,
			value: rua,
			message: 'Campo obrigatório'
		},{
			name: 'numero',
			validation: value => !!value,
			value: numero,
			message: 'Campo obrigatório'
		},{
			name: 'bairro',
			validation: value => !!value,
			value: bairro,
			message: 'Campo obrigatório'
		},{
			name: 'cep',
			validation: value => value.length === 10,
			value: cep,
			message: 'Formato inválido'
		},{
			name: 'cidade',
			validation: value => !!value,
			value: cidade,
			message: 'Campo obrigatório'
		},{
			name: 'estado',
			validation: value => value.length === 2,
			value: estado,
			message: 'Formato inválido'
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
	if (isLoading) return <div style={{ display: 'grid' }}><Spinner size='5rem' /></div>
	if (isError) return <Error />
	return (
		<>
			<GetCnpj cnpj={cnpj} setState={setState} storeowners={storeowners} setCnpjValid={setCnpjValid} />
			<Form
				validations={validations}
				sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
				inputs={[
					<FormInput name='fname' label='Nome' input={
						<InputText
							value={fname}
							onChange={({ target: { value } }) => setFname(capitalize(value))}
							placeholder='Nome do lojista'
						/>
					}/>,
					<FormInput name='lname' label='Sobrenome' input={
						<InputText
							value={lname}
							onChange={({ target: { value } }) => setLname(capitalize(value))}
							placeholder='Sobrenome do lojista'
						/>
					}/>,
					<FormInput name='rg' label='RG' input={
						<InputText
							value={rg}
							onChange={({ target: { value } }) => setRg(maskInput(value, '############', true))}
							placeholder='00.111.222-3'
						/>
					}/>,
					<FormInput name='cpf' label='CPF' input={
						<InputText
							value={cpf}
							onChange={({ target: { value } }) => setCpf(maskInput(value, '###.###.###-##', true))}
							placeholder='000.111.222-33'
						/>
					}/>,
					<FormInput name='birth' label='Nascimento' input={
						<InputText
							value={birth}
							onChange={({ target: { value } }) => setBirth(maskInput(value, '##/##/####', true))}
							placeholder='01/01/1990'
						/>
					}/>,
					<FormInput name='insta' label='Instagram da Loja' input={
						<InputText
							value={insta}
							onChange={({ target: { value } }) => setInsta(value)}
							placeholder='Ex.: ateliederoupa. Não use .com'
						/>
					}/>,
					<FormInput name='ie' label='Inscrição Estadual' input={
						<InputText
							value={ie}
							onChange={({ target: { value } }) => setIe(maskInput(value, '#############', true))}
							placeholder='consulte pelo Sintegra'
						/>
					}/>,
					<FormInput name='razao' label='Razão Social' input={
						<InputText
							value={razao}
							onChange={({ target: { value } }) => setRazao(value.toUpperCase())}
							placeholder='ALMEIDA MODAS LTDA'
						/>
					}/>,
					<FormInput name='fantasia' label='Nome Fantasia' input={
						<InputText
							value={fantasia}
							onChange={({ target: { value } }) => setFantasia(value.toUpperCase())}
							placeholder='ATELIE DE ROUPAS'
						/>
					}/>,
					<FormInput name='rua' label='Rua' input={
						<InputText
							value={rua}
							onChange={({ target: { value } }) => setRua(value.toUpperCase())}
							placeholder='R MARECHAL SILVA'
						/>
					}/>,
					<FormInput name='numero' label='Número' input={
						<InputText
							value={numero}
							onChange={({ target: { value } }) => setNumero(maskInput(value.toUpperCase(), '######', true))}
							placeholder='117'
						/>
					}/>,
					<FormInput name='complemento' label='Complemento' input={
						<InputText
							value={complemento}
							onChange={({ target: { value } }) => setComplemento(value.toUpperCase())}
							placeholder='BLOCO K'
						/>
					}/>,
					<FormInput name='bairro' label='Bairro' input={
						<InputText
							value={bairro}
							onChange={({ target: { value } }) => setBairro(value.toUpperCase())}
							placeholder='LAPA'
						/>
					}/>,
					<FormInput name='cep' label='CEP' input={
						<InputText
							value={cep}
							onChange={({ target: { value } }) => setCep(maskInput(value, '##.###-###', true))}
							placeholder='01.123-110'
						/>
					}/>,
					<FormInput name='cidade' label='Cidade' input={
						<InputText
							value={cidade}
							onChange={({ target: { value } }) => setCidade(value.toUpperCase())}
							placeholder='SÃO PAULO'
						/>
					}/>,
					<FormInput name='estado' label='Estado' input={
						<InputText
							value={estado}
							onChange={({ target: { value } }) => setEstado(maskInput(value.toUpperCase(), '##', false))}
							placeholder='SP'
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
							placeholder='email@gmail.com'
						/>
					}/>
				]}
			/>
			<Footer phone='+55 (11) 3334-0920' />
		</>
	)
}

export default ReferClient