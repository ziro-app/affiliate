import React from 'react'
import ErrorBoundary from '@bit/vitorbarbosa19.ziro.error-boundary'
import Router from './Router'

export const App = () => {
	return (
		<ErrorBoundary>
			<Router />
		</ErrorBoundary>
	)
}