import React, {
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
import { USER_TYPES, UserType } from '../../utils/Constants'
import { Link } from 'react-router-dom'


const SignUp = () => {
	const [firstName, setFirstName] = useState<string>("")
	const [lastName, setLastName] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [userType, setUserType] = useState<UserType>("")

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
		email: data.get('email'),
		password: data.get('password'),
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<SignupFormContainer>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign up
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
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
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
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
								value={userType}
								onChange={(e) => setUserType(e.target.value as UserType)}
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