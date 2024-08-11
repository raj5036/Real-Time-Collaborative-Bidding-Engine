import React, { useEffect, useState } from "react";
import { DeleteActiveBidsByBidders, GetBidAmountsByBidder, GetCurrentAcceptedBids } from "../../utils/ApiClient";
import { toast } from "react-toastify";
import { API_ERROR_MESSAGES } from "../../utils/Constants";
import { Alert, capitalize, Snackbar, TextField, Typography } from "@mui/material";
import { PageContainer, TableWrapper } from "./UsersCurrentBidsPageStyles";
import { IActiveBidListRowData, IBid } from "../../utils/Types";
import CustomTable from "../../commonComponents/CustomTable/CustomTable";

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
		numeric: true,
		label: 'Base Price',
	},
	{
		id: 'highestBidPrice',
		numeric: true,
		label: 'Highest Bid Price',
	},
	{
		id: 'yourBid',
		numeric: false,
		label: 'Your Bid amount',
	}
]


const UsersCurrentBidsPage: React.FC = () => {
	const [bids, setBids] = useState<IBid[]>([])
	const [tableRows, setTableRows] = useState<IActiveBidListRowData[]>([])
	const [showDeleteSnackbar, setShowDeleteSnackbar] = useState<boolean>(false)
	
	useEffect(() => {
		(async ()=> {
			const bids: IBid[] = await fetchAcceptedBids()
			const bidIds = bids.map(bid => bid.id)
			console.log("bidIds", bidIds)
			console.log(await fetchBidAmounts(bidIds))
		})()
	}, [])
	

	const fetchAcceptedBids = async () => {
		try {
			const result = await GetCurrentAcceptedBids()
			if (result.success) {
				console.log(result)
				setBids(() => {
					const rows: IActiveBidListRowData[] = createRowData(result.bids)
					setTableRows(rows)
					return result.bids
				})
				return result.bids
			}
		} catch (err) {
			console.log(err)
			toast.error(API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
		}
	}

	const fetchBidAmounts = async (bidIds: Array<string>) => {
		try {
			const result = await GetBidAmountsByBidder(bidIds)
			if (result.success) {
				console.log(result)
			}
		} catch(error) {
			console.log(error)
		}
	}

	const createRowData = (bidsData: IBid[]) => {
		const rows = bidsData.map((bid, index) => {
			const rowData: IActiveBidListRowData = {
				id: bid.id || index.toString(),
				bidTitle: bid.title,
				startDate: bid.startDate,
				startTime: bid.startTime,
				endDate: bid.endDate,
				endTime: bid.endTime,
				bidItems: bid.bidItems.length.toString(),
				bidStatus: (<Typography
					color={bid.status === "active" ? "success.main" : "error.main"}
				>{capitalize(bid.status)}</Typography>),
				basePrice: 30,
				highestBidPrice: bid.highestBidPrice || 0,
				yourBid: (<TextField
					size="small"
					value={"bid.yourBid"}
				/>)
			}

			return rowData
		})

		return rows
	}

	const handleActiveBidsDelete = async (deleteIds: Array<string>) => {
		try {
			const result = await DeleteActiveBidsByBidders(deleteIds)
			if (result.success) {
				setShowDeleteSnackbar(true)
				fetchAcceptedBids()
			}
		} catch(error) {
			console.log(error)
		}
	}

	const handleSnackbarClose = () => {
		setShowDeleteSnackbar(false)
	}

	return (
		<PageContainer>
			{!bids.length && <Typography variant="body1">You have not accepted any bids so far {":("}</Typography>}
			<TableWrapper>
				{tableRows.length > 0 && 
					<CustomTable 
						tableTitle={"Your Current Ongoing Bids"}
						headCells={headCells} 
						rows={tableRows} 
						handleRowsDelete={handleActiveBidsDelete} 
					/>}
			</TableWrapper>
			<Snackbar open={showDeleteSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert
					onClose={handleSnackbarClose}
					severity="success"
					variant="filled"
					sx={{ width: '100%' }}
				>
					Active bids deleted successfully
				</Alert>
			</Snackbar>
		</PageContainer>
	)
}

export default UsersCurrentBidsPage