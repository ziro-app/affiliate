import React from 'react'
import { auth } from '../../Firebase/index'
import ConfirmEmail from '@bit/vitorbarbosa19.ziro.confirm-email'
import { containerWithPadding } from '@ziro/theme'

const EmailConfirmation = () =>
	<div style={containerWithPadding}>
		<ConfirmEmail email='vitor' auth={auth} />
	</div>

export default EmailConfirmation