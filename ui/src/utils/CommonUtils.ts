import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'

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
	parseDate: (dateTime: string) => {
		const date = dateTime.split(' ')[0]
		return dayjs(date).format('MMMM D, YYYY')
	},
	parseTime: (dateTime: string) => {
		const timeString = dateTime.split(' ')[1]
		return dayjs(timeString, "HH:mm:ss").format("h:mm A")
	},
}