import React, { useState } from 'react'
import FormRegisterStoreowner from '@bit/vitorbarbosa19.ziro.form-register-storeowner'
import fetch from './fetch'
import sendToBackend from './sendToBackend'
import searchCnpj from './searchCnpj'

const ReferClient = () => {
	const [isLoading, setIsLoading] = useState(true)
	return <FormRegisterStoreowner isLoading={isLoading} setIsLoading={setIsLoading} sendToBackend={sendToBackend} searchCnpj={searchCnpj} fetch={fetch} hasAdvisor={false} hasAffiliated={false} haveSalesman={false} />
}

export default ReferClient