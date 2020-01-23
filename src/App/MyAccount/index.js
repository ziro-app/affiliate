import React from 'react'
import { default as AccountOptions } from '@bit/vitorbarbosa19.ziro.my-account'
import Footer from '@bit/vitorbarbosa19.ziro.footer'

const MyAccount = () =>
	<>
		<AccountOptions />
		<div style={{ display: 'grid', marginTop: '20px' }}></div>
		<Footer phone='+55 (11) 3334-0920' />
	</>

export default MyAccount