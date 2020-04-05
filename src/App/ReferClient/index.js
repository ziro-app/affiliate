import React, { useState, useContext } from 'react'
import FormRegisterStoreowner from '@bit/vitorbarbosa19.ziro.form-register-storeowner'
import fetch from './fetch'
import sendToBackend from './sendToBackend'
import searchCnpj from './searchCnpj'
import { userContext } from '../appContext'

const ReferClient = () => {
	const [isLoading, setIsLoading] = useState(true)
	const { name, cpf } = useContext(userContext)
	return <FormRegisterStoreowner appAffiliateName={name} appAffiliateCpf={cpf} isLoading={isLoading} setIsLoading={setIsLoading} sendToBackend={sendToBackend} searchCnpj={searchCnpj} fetch={fetch} hasAdvisor={false} hasAffiliated={false} haveSalesman={false} />
}

export default ReferClient