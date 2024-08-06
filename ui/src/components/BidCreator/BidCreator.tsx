import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { BidCreatorContainer, BidItemsContainer, SetTimer } from "./BidCreatorStyles"
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { DateTimePicker } from "@mui/x-date-pickers"
import { IBidItem } from "../../utils/Constants"

const BidCreator: React.FC = () => {
	const [title, setTitle] = useState<string>("")
	const [startTime, setStartTime] = useState<Dayjs>(
		dayjs('2014-08-18T21:11:54'),
	);
	const [endTime, setEndTime] = useState<Dayjs>(
		dayjs('2014-08-18T21:11:54'),
	);
	const [bidItems, setBidItems] = useState<IBidItem[]>([{
		title: "",
		price: 0,
		description: "",
	}])
	const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)

	useEffect(() => {
		if (title) {
			setSubmitDisabled(false)
		} else {
			setSubmitDisabled(true)
		}
	}, [title])

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
			<BidItemsContainer>
				<Typography variant="h6">Create Bid Items</Typography>
				<Box className="bid-inputs-container">
					{bidItems.map((bidItem, index) => (
						<Stack direction={"row"} spacing={2} flexWrap={"wrap"} key={index}>
							<TextField
								label="Bid Item Name"
								name="title"
								required
								value={bidItem.title}
							/>
							<TextField 
								label="Description"
								name="description"
								value={bidItem.description}
							/>
							<Button 
								variant="outlined"
							>Add</Button>
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