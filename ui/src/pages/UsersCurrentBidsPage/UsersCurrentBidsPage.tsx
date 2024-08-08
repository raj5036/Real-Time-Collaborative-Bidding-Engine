import React, { useEffect, useState } from "react";
import { GetCurrentAcceptedBids } from "../../utils/ApiClient";
import { toast } from "react-toastify";
import { API_ERROR_MESSAGES } from "../../utils/Constants";
import { Typography } from "@mui/material";
import { PageContainer, TableWrapper } from "./UsersCurrentBidsPageStyles";
import { IBid, IBidStatus } from "../../utils/Types";
import CustomTable from "../../commonComponents/CustomTable/CustomTable";
import { CommonUtils } from "../../utils/CommonUtils";

const headCells = [
	{
		id: 'id',
		numeric: true,
		label: 'ID',
	},
	{
		id: 'bidTitle',
		numeric: false,
		label: 'Title',
	},
	{
		id: 'startDate',
		numeric: false,
		label: 'Starting Date',
	},
	{
		id: 'startTime',
		numeric: false,
		label: 'Starting Time',
	},
	{
		id: 'endDate',
		numeric: false,
		label: 'Ending Date',
	},
	{
		id: 'endTime ',
		numeric: false,
		label: 'Ending  Time',
	},
	{
		id: 'bidItems',
		numeric: false,
		label: 'Items to Bid On',
	},
	{
		id: 'bidStatus',
		numeric: false,
		label: 'Bid Status',
	},
	{
		id: 'basePrice',
		numeric: false,
		label: 'Base Price',
	},
	{
		id: 'highestBidPrice',
		numeric: false,
		label: 'Highest Bid Price',
	},
	{
		id: 'yourBid',
		numeric: false,
		label: 'Your Bid amount',
	}
]

type RowData = {
	id: number
	bidTitle: string
	startDate: string
	startTime: string
	endDate: string
	endTime: string
	bidItems: string
	bidStatus: IBidStatus
	basePrice: string
	highestBidPrice: string
	yourBid: string
}

const UsersCurrentBidsPage: React.FC = () => {
	const [bids, setBids] = useState<IBid[]>([])
	const [tableRows, setTableRows] = useState<RowData[]>([])

	useEffect(() => {
		fetchAcceptedBids()
		if (bids.length) {
			createRowData()
		}
	}, [bids])

	const fetchAcceptedBids = async () => {
		try {
			const result = await GetCurrentAcceptedBids()
			if (result.success) {
				console.log(result)
				setBids(result.bids)
			}
		} catch (err) {
			console.log(err)
			toast.error(API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
		}
	}

	const createRowData = () => {
		const rows = bids.map((bid, index) => {
			const rowData: RowData = {
				id: index + 1,
				bidTitle: bid.title,
				startDate: CommonUtils.parseDate(bid.startTime),
				startTime: CommonUtils.parseTime(bid.startTime),
				endDate: CommonUtils.parseDate(bid.endTime),
				endTime: CommonUtils.parseTime(bid.endTime),
				bidItems: bid.bidItems.length.toString(),
				bidStatus: 'closed',
				basePrice: '30',
				highestBidPrice: '2',
				yourBid: 'ok'
			}

			return rowData
		})

		setTableRows(prevState => [...prevState, ...rows])
	}

	return (
		<PageContainer>
			<Typography variant="h5">Your Current Ongoing Bids</Typography>
			{!bids.length && <Typography variant="body1">You have not accepted any bids so far {":("}</Typography>}
			<TableWrapper>
				<CustomTable rows={tableRows} headCells={headCells}/>
			</TableWrapper>
		</PageContainer>
	)
}

export default UsersCurrentBidsPage