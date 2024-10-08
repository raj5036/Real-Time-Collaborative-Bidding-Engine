import {
	useContext,
	useEffect,
	useState
} from 'react'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { 
	Avatar, 
	Box, 
	Button, 
	Container,
	Grid, 
	MenuItem, 
	Stack, 
	TextField, 
	Typography,
} from '@mui/material';
import { RoleSelector, SignupFormContainer } from './SignupPageStyles'
import { SESSION_STORAGE_KEYS, USER_TYPES } from '../../utils/Constants'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError, SignupUser } from '../../utils/ApiClient';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../utils/CommonUtils';
import { UserType } from '../../utils/Types';
import AppRoutes from '../../routes/routes';
import { UserContext } from '../../context/UserContext/UserContext';
import { IUserContext } from '../../context/UserContext/Types';


const SignUp = () => {
	const [firstname, setFirstname] = useState<string>("")
	const [lastname, setLastname] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [role, setRole] = useState<UserType>("")
	const [btnDisabled, setBtnDisabled] = useState<boolean>(true)
	
	useEffect(() => {
		if (firstname && lastname && email && password && role) {
			setBtnDisabled(false)
		} else {
			setBtnDisabled(true)
		}
	}, [firstname, lastname, email, password, role])

	const { setUser } = useContext(UserContext) as IUserContext

	const navigate = useNavigate()

	const handleSubmit = async () => {
		try {
			if (!email || !password || !firstname || !lastname || !role) {
				toast.error("Please fill all the fields")
				return
			}
			const result = await SignupUser({
				email, password, firstname, lastname, role
			})
			console.log(result)
			if (result.success == false) {
				if (result.message === ApiError.CONFLICT) {
					toast.error("User already exists")
				} else {
					toast.error(result.message)
				}
			} else {
				toast.success("Signup Successful")
				setUser(result.user)
				CommonUtils.setItemInSessionStorage(SESSION_STORAGE_KEYS.USER_TOKEN, result.token)
				if (result.user.role === USER_TYPES.BID_CREATOR) {
					navigate(AppRoutes.CREATE_BID)
				} else {
					navigate(AppRoutes.BIDS_LEADERBOARD)
				}
			}
		} catch (error) {
			console.error(error)
			toast.error("Something went wrong! Please try again")
		}
	};

	return (
		<Container component="main" maxWidth="xs" onKeyDown={(e) => {
			if (e.key === "Enter") {
			  handleSubmit()
			}
		}}>
			<SignupFormContainer>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign up
			</Typography>
			<Box component="div" sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item sm={6} xs={12}>
						<TextField
							autoComplete="given-name"
							name="firstName"
							required
							fullWidth
							label="First Name"
							autoFocus
							type="text"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<TextField
							required
							fullWidth
							label="Last Name"
							name="lastName"
							autoComplete="family-name"
							type="text"
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							label="Email Address"
							name="email"
							autoComplete="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name="password"
							label="Password"
							autoComplete="new-password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Stack direction="row" spacing={1} justifyContent={"space-between"} alignItems="center">
							<Typography>Select your role</Typography>
							<RoleSelector 
								select
								required
								value={role}
								onChange={(e) => setRole(e.target.value as UserType)}
							>
								{Object.values(USER_TYPES).map((value) => (
									<MenuItem key={value} value={value}>
										{value}
									</MenuItem>
								))}
							</RoleSelector>
						</Stack>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={btnDisabled}
					onClick={handleSubmit}
				>
					Sign Up
				</Button>
				<Grid container justifyContent="flex-end">
				<Grid item>
					<Link to="/login">Already have an account? Sign in</Link>
				</Grid>
				</Grid>
			</Box>
			</SignupFormContainer>
		</Container>
	);
}

export default SignUp