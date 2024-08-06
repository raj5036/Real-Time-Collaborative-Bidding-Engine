import { Button, TextField, Typography } from "@mui/material"
import { BidCreatorContainer, SetTimer } from "./BidCreatorStyles"
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { DateTimePicker } from "@mui/x-date-pickers"

const BidCreator: React.FC = () => {
	const [title, setTitle] = useState<string>("")
	const [startTime, setStartTime] = useState<Dayjs>(
		dayjs('2014-08-18T21:11:54'),
	);
	const [endTime, setEndTime] = useState<Dayjs>(
		dayjs('2014-08-18T21:11:54'),
	);
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
					renderInput={(params: any) => <TextField {...params} />}
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
					renderInput={(params: any) => <TextField {...params} />}
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