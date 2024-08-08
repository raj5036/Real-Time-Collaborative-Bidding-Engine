import React, { useEffect } from "react";
import { GetCurrentAcceptedBids } from "../../utils/ApiClient";
import { toast } from "react-toastify";
import { API_ERROR_MESSAGES } from "../../utils/Constants";

const UsersCurrentBidsPage: React.FC = () => {
	useEffect(() => {
		fetchAcceptedBids()
	}, [])

	const fetchAcceptedBids = async () => {
		try {
			const result = await GetCurrentAcceptedBids()
			if (result.success) {
				console.log(result)
			}
		} catch (err) {
			console.log(err)
			toast.error(API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
		}
	}
	return (
		<React.Fragment>
			Users Current Bids Page
		</React.Fragment>
	)
}

export default UsersCurrentBidsPage