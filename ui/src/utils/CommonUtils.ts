export const CommonUtils = {
	setItemInLocalStorage: (key: string, value: string) => {
		localStorage.setItem(key, value)
	},
	getItemFromLocalStorage: (key: string) => {
		return localStorage.getItem(key)
	},
	removeItemFromLocalStorage: (key: string) => {
		localStorage.removeItem(key)
	}
}