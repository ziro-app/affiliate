const sendToBackend = state => () =>
	new Promise((res, rej) => setTimeout(() => res(console.log(state)), 2000))

export default sendToBackend