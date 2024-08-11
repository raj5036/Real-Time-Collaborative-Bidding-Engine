import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { IBid } from "./Types"

dayjs.extend(customParseFormat)

export const CommonUtils = {
	setItemInLocalStorage: (key: string, value: string) => {
		localStorage.setItem(key, value)
	},
	getItemFromLocalStorage: (key: string) => {
		return localStorage.getItem(key)
	},
	removeItemFromLocalStorage: (key: string) => {
		localStorage.removeItem(key)
	},
	setItemInSessionStorage: (key: string, value: string) => {
		sessionStorage.setItem(key, value)
	},
	getItemFromSessionStorage: (key: string) => {
		return sessionStorage.getItem(key)
	},
	removeItemFromSessionStorage: (key: string) => {
		sessionStorage.removeItem(key)
	},
	parseDate: (dateTime: string) => {
		const date = dateTime.split(' ')[0]
		return dayjs(date).format('MMMM D, YYYY')
	},
	parseTime: (dateTime: string) => {
		const timeString = dateTime.split(' ')[1]
		return dayjs(timeString, "HH:mm:ss").format("h:mm A")
	},
	getBidBasePrice: (bid: IBid): number => {
		const basePrice: number = bid.bidItems.reduce((acc, bidItem) => {
			return acc + bidItem.price
		}, 0)

		return basePrice
	}
}