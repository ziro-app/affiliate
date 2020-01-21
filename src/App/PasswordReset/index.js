import React from 'react'
import ResetPass from '@bit/vitorbarbosa19.ziro.reset-pass'
import sendToBackend from './sendToBackend'
import { containerWithPadding } from '@ziro/theme'

const PasswordReset = () =>
	<div style={containerWithPadding}>
		<ResetPass sendToBackend={sendToBackend} />
	</div>

export default PasswordReset