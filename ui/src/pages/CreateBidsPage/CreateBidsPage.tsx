import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { BidCreatorContainer, BidItemsContainer, SetTimer } from "./CreateBidsPageStyles"
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { DateTimePicker } from "@mui/x-date-pickers"
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { toast } from "react-toastify"
import { CreateBid } from "../../utils/ApiClient"
import { IBidItem } from "../../utils/Types"
import { API_ERROR_MESSAGES } from "../../utils/Constants"
import { useNavigate } from "react-router-dom"
import AppRoutes from "../../routes/routes"

const CreateBidsPage: React.FC = () => {
	const [title, setTitle] = useState<string>("")
	const [startTime, setStartTime] = useState<string>(
		dayjs('2014-08-18T21:11:54').format('YYYY-MM-DD HH:mm:ss'),
	);
	const [endTime, setEndTime] = useState<string>(
		dayjs('2014-08-18T21:11:54').format('YYYY-MM-DD HH:mm:ss'),
	);
	const [currentBidItem, setCurrentBidItem] = useState<IBidItem>({
		title: "",
		price: 0,
		description: "",
	})
	const [bidItems, setBidItems] = useState<IBidItem[]>([{
		title: "",
		price: 0,
		description: "",
	}])
	const [addDisabled, setAddDisabled] = useState<boolean>(true)
	const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)

	useEffect(() => {
		if (title) {
			setSubmitDisabled(false)
		} else {
			setSubmitDisabled(true)
		}
	}, [title])

	useEffect(() => {
		if (currentBidItem.title && currentBidItem.price && currentBidItem.description) {
			setAddDisabled(false)
		} else {
			setAddDisabled(true)
		}
	}, [currentBidItem])

	const navigate = useNavigate()

	const handleAddBidItem = () => {
		setBidItems(prevBidItems => {
			const temp = currentBidItem

			// reset the current bid item
			setCurrentBidItem({
				title: "",
				price: 0,
				description: ""
			}) 

			return [...prevBidItems, temp]
		})
	}

	const handleDeleteBidItem = (index: number) => () => {
		setBidItems(prevBidItems => {
			return [...prevBidItems.slice(0, index), ...prevBidItems.slice(index + 1)]
		})
	}

	const handleBidSubmit = async () => {
		try {
			const result = await CreateBid({
				title,
				startTime,
				endTime,
				bidItems: bidItems.slice(1),	
			})
			console.log("result", result)
			if (result.success) {
				toast.success(result.message)
				navigate(AppRoutes.ALL_BIDS)
			}
		} catch (error) {
			toast.error(API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
		}
	}

	return (
		<BidCreatorContainer>
			<Typography variant="h3" sx={{ mb: 2 }}>Create a new Bid</Typography>
			<TextField
				label="Bid Title" 
				name="title"
				className="title-input"
				required
				autoFocus
				fullWidth
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Typography variant="h6" sx={{ mt: 2 }}>Create Items for the Bid</Typography>
			<BidItemsContainer>
				<Box className="bids-container">
					{bidItems.map((bidItem, index) => (
						<Stack direction={"row"} spacing={2} flexWrap={"wrap"} key={index} className="bid-input-container">
							<TextField
								label="Item title"
								name="title"
								required
								value={bidItem.title || currentBidItem.title}
								onChange={(e) => {
									setCurrentBidItem({ ...currentBidItem, title: e.target.value })
								}}
							/>
							<TextField 
								label="Description"
								name="description"
								required
								value={bidItem.description || currentBidItem.description}
								onChange={(e) => {
									setCurrentBidItem({ ...currentBidItem, description: e.target.value })
								}}
							/>
							<TextField 
								label="Price"
								name="price"
								value={bidItem.price || currentBidItem.price}
								type="number"
								required
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<MonetizationOnIcon color="warning"/>
										</InputAdornment>
									),
								}}
								onChange={(e) => {
									setCurrentBidItem({ ...currentBidItem, price: Number(e.target.value) })
								}}
							/>
							{bidItem.title && bidItem.price && bidItem.description ? (
								<Button
									variant="contained"
									color="error"
									size="small"
									className="delete-button"
									onClick={handleDeleteBidItem(index)}
								><DeleteIcon /></Button>
							): (<Button 
								variant="contained"
								color="success"
								disabled={addDisabled}
								onClick={handleAddBidItem}
							><DoneOutlineIcon /></Button>)}
						</Stack>	
					))}
				</Box>
			</BidItemsContainer>
			<SetTimer>
				<DateTimePicker
					label="Start Time"
					className="start-time-picker"
					value={dayjs(startTime)}
					onChange={(newValue: Dayjs | null) => {
						if (!newValue) {
							return
						}
						setStartTime(newValue.format('YYYY-MM-DD HH:mm:ss'))
					}}
					slotProps={{
						textField: {
							variant: "outlined",
						}
					}}
				/>
				<DateTimePicker
					label="End Time"
					className="end-time-picker"
					value={dayjs(endTime)}
					onChange={(newValue: Dayjs | null) => {
						if (!newValue) {
							return
						}
						setEndTime(newValue.format('YYYY-MM-DD HH:mm:ss'))
					}}
					slotProps={{
						textField: {
							variant: "outlined",
						}
					}}
				/>
			</SetTimer>
			<Button
				className="submit-btn"
				onClick={handleBidSubmit}
				variant="contained"
				color="primary"
				disabled={submitDisabled}
			>Publish Bid</Button>
		</BidCreatorContainer>
	)
}

export default CreateBidsPage