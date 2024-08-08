import React, { useEffect, useState } from "react";
import { GetCurrentAcceptedBids } from "../../utils/ApiClient";
import { toast } from "react-toastify";
import { API_ERROR_MESSAGES } from "../../utils/Constants";
import { Typography } from "@mui/material";
import { PageContainer, TableWrapper } from "./UsersCurrentBidsPageStyles";
import { IBid } from "../../utils/Types";
import CustomTable from "../../commonComponents/CustomTable/CustomTable";

const UsersCurrentBidsPage: React.FC = () => {
	const [bids, setBids] = useState<IBid[]>([])

	useEffect(() => {
		fetchAcceptedBids()
	}, [])

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
	return (
		<PageContainer>
			<Typography variant="h5">Your Current Ongoing Bids</Typography>
			{!bids.length && <Typography variant="body1">You have not accepted any bids so far {":("}</Typography>}
			<TableWrapper>
				<CustomTable />
			</TableWrapper>
		</PageContainer>
	)
}

export default UsersCurrentBidsPage