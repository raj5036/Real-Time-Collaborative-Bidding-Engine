import React, { useEffect, useState } from "react"
import { MainContainer } from "./ListAllBidsPageStyles"
import { Typography } from "@mui/material"
import { GetAllBidsByUser } from "../../utils/ApiClient"
import { IBid } from "../../utils/Types"
import { toast } from "react-toastify"

const ListAllBidsPage: React.FC = () => {
	const [bids, setBids] = useState<IBid[]>([])

	useEffect(() => {
		(async () => {
			try {
				const result = await GetAllBidsByUser()
				console.log(result)
				if (result.success) {
					setBids(result.bids)
				} else {
					toast.error("Something went wrong! Try refreshing the page")
				}
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])
	
	return (
		<MainContainer>
			<Typography variant="h4">Bids created by YOU!</Typography>
		</MainContainer>
	)
}

export default ListAllBidsPage