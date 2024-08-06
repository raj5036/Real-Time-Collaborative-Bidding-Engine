import axios from "axios"
import { Config } from "../config/config"

export const SignupUser = (user: unknown) => {
	return Promise.resolve(axios.post(`${Config.SERVER_URL_TEST}/api/auth/signup`, user))
		.then(res => res.data)
		.catch(console.error)
}

export const LoginUser = (user: {email: string, password: string}) => {
	return Promise.resolve(axios.post(`${Config.SERVER_URL_TEST}/api/auth/login`, user))
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}