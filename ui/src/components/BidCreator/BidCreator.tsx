import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { BidCreatorContainer, BidItemsContainer, SetTimer } from "./BidCreatorStyles"
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { DateTimePicker } from "@mui/x-date-pickers"
import { IBidItem } from "../../utils/Constants"
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const BidCreator: React.FC = () => {
	const [title, setTitle] = useState<string>("")
	const [startTime, setStartTime] = useState<Dayjs>(
		dayjs('2014-08-18T21:11:54'),
	);
	const [endTime, setEndTime] = useState<Dayjs>(
		dayjs('2014-08-18T21:11:54'),
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

	const handleSubmit = () => {}

	return (
		<BidCreatorContainer>
			<Typography variant="h3">Create a new Bid</Typography>
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
					value={startTime}
					onChange={(newValue: Dayjs | null) => {
						if (!newValue) {
							return
						}
						setStartTime(newValue)
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
					value={endTime}
					onChange={(newValue: Dayjs | null) => {
						if (!newValue) {
							return
						}
						setEndTime(newValue)
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
				onClick={handleSubmit}
				variant="contained"
				color="primary"
				disabled={submitDisabled}
			>Publish Bid</Button>
		</BidCreatorContainer>
	)
}

export default BidCreator