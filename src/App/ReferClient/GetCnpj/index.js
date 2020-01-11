import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import sendToBackend from './sendToBackend'
import maskInput from '@ziro/mask-input'
import Form from '@bit/vitorbarbosa19.ziro.form'
import FormInput from '@bit/vitorbarbosa19.ziro.form-input'
import InputText from '@bit/vitorbarbosa19.ziro.input-text'

const GetCnpj = ({ cnpj, setState, storeowners }) => {
	// useEffect(() => getCnpj(setState), [])
	const { setCnpj, ...setRestOfState } = setState
	const validations = [
		{
			name: 'cnpj',
			validation: value => !storeowners.includes(value), // value.length === 18
			value: cnpj,
			message: 'CNPJ já cadastrado'
		}
	]
	return (
		<Form
			validations={validations}
			sendToBackend={sendToBackend ? sendToBackend(setRestOfState) : () => null}
			inputs={[
				<FormInput name='cnpj' label='CNPJ' input={
					<InputText
						value={cnpj}
						onChange={({ target: { value } }) => setCnpj(maskInput(value, '##.###.###/####-##', true))}
						placeholder='00.111.222/0001-33'
					/>
				}/>
			]}
		/>
	)
}

GetCnpj.propTypes = {
	cnpj: PropTypes.string.isRequired,
	setState: PropTypes.object.isRequired
}

export default GetCnpj