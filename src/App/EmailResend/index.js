import React from 'react'
import ResendEmail from '@bit/vitorbarbosa19.ziro.resend-email'
import sendToBackend from './sendToBackend'
import { containerWithPadding } from '@ziro/theme'

const EmailResend = () =>
	<div style={containerWithPadding}>
		<ResendEmail sendToBackend={sendToBackend} />
	</div>

export default EmailResend