import React, { useEffect, useState } from "react";
import { DeleteActiveBidsByBidders, GetBidAmountsByBidder, GetCurrentAcceptedBids, UpdateBidAmount } from "../../utils/ApiClient";
import { toast } from "react-toastify";
import { API_ERROR_MESSAGES } from "../../utils/Constants";
import { Alert, Box, Button, capitalize, CircularProgress, Snackbar, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { ModalContainer, PageContainer, TableWrapper } from "./UsersCurrentBidsPageStyles";
import { IActiveBidListRowData, IBid } from "../../utils/Types";
import CustomTable from "../../commonComponents/CustomTable/CustomTable";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AppModal from "../../commonComponents/Modal/AppModal";
import GroupedAccordion from "../../commonComponents/GroupedAccordion/GroupedAccordion";
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
		numeric: true,
		label: 'Base Price (INR)',
	},
	{
		id: 'highestBidPrice',
		numeric: true,
		label: 'Highest Bid Price  (INR)',
	},
	{
		id: 'yourBid',
		numeric: false,
		label: 'Your Bid amount (INR)',
	}
]

type BidAmount = {
	bidId: string,
	bidAmount: number
}

const UsersCurrentBidsPage: React.FC = () => {
	const [bids, setBids] = useState<IBid[]>([])
	const [tableRows, setTableRows] = useState<IActiveBidListRowData[]>([])
	const [showDeleteSnackbar, setShowDeleteSnackbar] = useState<boolean>(false)
	const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
	const [editBid, setEditBid] = useState<any>({})
	const [currentBidAmount, setCurrentBidAmount] = useState<number>(0)
	
	useEffect(() => {
		(async ()=> {
			await fetchRowData()
		})()
	}, [])

	const fetchRowData = async () => {
		console.log("inside fetchRowData")
		const bids: IBid[] = await fetchAcceptedBids()
		if (bids.length) {
			const bidIds = bids.map(bid => bid.id)
			console.log("bidIds", bidIds)
			const result = await fetchBidAmounts(bidIds)
			const rows: IActiveBidListRowData[] = createRowData(bids, result)
			setTableRows(rows)
		}
	} 

	const fetchAcceptedBids = async () => {
		try {
			const result = await GetCurrentAcceptedBids()
			if (result.success) {
				console.log(result)
				setBids(result.bids)
				return result.bids
			}
		} catch (err) {
			console.log(err)
			toast.error(API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
		}
	}

	// Fetch the current bid amount for each bid by this bidder
	const fetchBidAmounts = async (bidIds: Array<string>) => {
		try {
			const result = await GetBidAmountsByBidder(bidIds)
			if (result.success) {
				console.log(result)
				return result.bidAmounts
			}
		} catch(error) {
			console.log(error)
		}
	}

	const getCurrentBidAmount = (bidAmounts: Array<BidAmount>, bidId: string): number => {
		console.log("bidAmounts in getCurrentBidAmount", bidAmounts)
		if (!bidAmounts || !bidAmounts.length) return 0
		return bidAmounts.find(bid => bid.bidId === bidId)?.bidAmount || 0
	}

	const handleEditBidAmount = (bid: IBid, bidAmounts: Array<BidAmount>) => () => {
		setCurrentBidAmount(getCurrentBidAmount(bidAmounts, bid.id))
		setEditBid(bid)
		setEditModalOpen(true)
	}

	const createRowData = (bidsData: IBid[], bidAmounts: Array<BidAmount>) => {
		console.log("bidAmounts in createRowData", bidAmounts)
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
				basePrice: CommonUtils.getBidBasePrice(bid),
				highestBidPrice: bid.highestBidPrice || 0,
				yourBid: (
					<Tooltip title={
						`Your Bid current is: ${getCurrentBidAmount(bidAmounts, bid.id)} INR, Click to edit`
					}>
						<Stack 
							direction="row"
							spacing={2}
							justifyContent="center" 
							alignItems="center"
							onClick={handleEditBidAmount(bid, bidAmounts)}
						>
							<Typography>{getCurrentBidAmount(bidAmounts, bid.id)}</Typography>
							<BorderColorIcon color="action"/>
						</Stack>
					</Tooltip>
				)
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

	const handleModalClose = () => {
		setEditModalOpen(false)
	}

	const onEditBidClick = async () => {
		try {
			const result = await UpdateBidAmount(editBid.id, currentBidAmount)
			if (result.success) {
				toast.success("Bid amount updated successfully")
				await fetchRowData()
			}
		} catch (error) {
			console.log(error)
			toast.error(API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
		} finally {
			setEditModalOpen(false)
		}
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
			<AppModal open={editModalOpen} handleClose={handleModalClose}>
				{editBid.title 
					? (	<ModalContainer>
							<Typography variant="h5" className="modal-header">
								Edit Bid Amount for <span className="bid-title">{editBid?.title}</span>
							</Typography>
							<Typography variant="body1" className="bid-items-header" fontWeight={"bold"}>Items to bid on:</Typography>
							<GroupedAccordion items={editBid.bidItems}/>
							<Box className="bid-amount-container">
								<Typography variant="body1" className="bid-amount-header" fontWeight={"bold"}>Edit your Bid Amount:</Typography>
								<TextField
									id="bid-amount"
									type="number"
									variant="outlined"
									value={currentBidAmount || 0}
									onChange={(e) => setCurrentBidAmount(parseInt(e.target.value))}
								/>
							</Box>
							<Stack 
								direction={"row"} 
								justifyContent={"flex-end"} 
								alignItems={"center"} 
								spacing={2} 
								className="buttons"
							>
								<Button 
									className="cancel" color="error" variant="outlined" onClick={handleModalClose}
								>Cancel</Button>
								<Button color="success" variant="contained" onClick={onEditBidClick}>Edit</Button>
							</Stack>
						</ModalContainer>
					)
					: <CircularProgress color="info"/>
				}
			</AppModal>
		</PageContainer>
	)
}

export default UsersCurrentBidsPage