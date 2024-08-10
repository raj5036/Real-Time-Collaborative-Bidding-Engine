import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { IActiveBid, IActiveBidListRowData, IBid } from "./Types"

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
	getBidBasePrice: (bid: IBid): number => {
		const basePrice: number = bid.bidItems.reduce((acc, bidItem) => {
			return acc + bidItem.price
		}, 0)

		return basePrice
	},
	getTableRowsForActiveBidsByBidder: (activeBids: IActiveBid[]): IActiveBidListRowData[] => {
		return activeBids.map((activeBid) => {
			const rowData: IActiveBidListRowData = {
				id: activeBid.bid.id,
				bidTitle: activeBid.bid.title,
				bidItems: activeBid.bid.bidItems.length.toString(),
				startDate: CommonUtils.parseDate(activeBid.bid.startTime),
				startTime: CommonUtils.parseTime(activeBid.bid.startTime),
				endDate: CommonUtils.parseDate(activeBid.bid.endTime),
				endTime: CommonUtils.parseTime(activeBid.bid.endTime),
				bidStatus: activeBid.bidStatus,
				basePrice: CommonUtils.getBidBasePrice(activeBid.bid),
				highestBidPrice: 23.5,
				yourBid: activeBid.currentBidPrice
			}

			return rowData
		})

	}
}