import axios from "axios"

export const SignupUser = () => {
	return Promise.resolve(axios.post('/api/auth/signup', {
		email: 'j9QpY@example.com',
	}))
		.then(res => res.data)
		.catch(console.error)
}

export const LoginUser = (user: {email: string, password: string}) => {
	return Promise.resolve(axios.post('http://localhost:3000/api/auth/login', user))
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}