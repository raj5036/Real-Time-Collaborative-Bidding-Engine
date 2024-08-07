import axios from "axios"
import { Config } from "../config/config"
import { LocalStorageKeys } from "./Constants"
import { IBid } from "./Types"

export const ApiError = {
	CONFLICT: "Data already exists",
}
axios.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem(LocalStorageKeys.USER_TOKEN)
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export const SignupUser = (user: unknown) => {
	return Promise.resolve(axios.post(`${Config.SERVER_URL_TEST}/api/auth/signup`, user))
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export const LoginUser = (user: {email: string, password: string}) => {
	return Promise.resolve(axios.post(`${Config.SERVER_URL_TEST}/api/auth/login`, user))
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export const CreateBid = (bidDetails: IBid) => {
	return Promise.resolve(
		axios.post(`${Config.SERVER_URL_TEST}/api/bid-item/create`, bidDetails)
	)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export const deleteBid = (bidId: string) => {
	return Promise.resolve(
		axios.delete(`${Config.SERVER_URL_TEST}/api/bid-item/delete/${bidId}`)
	)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}