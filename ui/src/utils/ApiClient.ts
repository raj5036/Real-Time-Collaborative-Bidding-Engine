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

export const CreateBid = (bid: IBid) => {
	return Promise.resolve(
		axios.post(`${Config.SERVER_URL_TEST}/api/bid-item/create`, bid)
	)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export const GetAllBidsByUser = () => {
	return Promise.resolve(
		axios.get(`${Config.SERVER_URL_TEST}/api/bid-item/get-all-by-user`)
	)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export const deleteBidsBulk = (ids: Array<string>) => {
	return Promise.resolve(
		axios.delete(`${Config.SERVER_URL_TEST}/api/bid-item/delete-bulk`, {
			data: { ids },
		})
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

export const AcceptBidRequest = (bidId: any) => {
	return Promise.resolve(
		axios.post(`${Config.SERVER_URL_TEST}/api/user/accept-bid-request`, {
			bidId,
		})
	)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export const GetCurrentAcceptedBids = () => {
	return Promise.resolve(
		axios.get(`${Config.SERVER_URL_TEST}/api/user/accepted-bids`)
	)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}

export const DeleteActiveBidsByBidders = (deleteIds: Array<string>) => {
	return Promise.resolve(
		axios.delete(`${Config.SERVER_URL_TEST}/api/bidder/delete-active-bids`, {
			data: { deleteIds },
		})
	)
		.then(res => res.data)
		.catch(error => {
			throw error
		})
}