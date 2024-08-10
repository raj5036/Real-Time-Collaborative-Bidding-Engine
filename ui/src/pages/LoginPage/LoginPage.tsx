import {useContext, useEffect, useState} from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { 
	Avatar, 
	Box, 
	Button, 
	Checkbox, 
	Container, 
	FormControlLabel, 
	Grid, 
	TextField, 
	Typography 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { GetCurrentAcceptedBids, LoginUser } from '../../utils/ApiClient';
import { LoginController } from './LoginPageStyles';
import { CommonUtils } from '../../utils/CommonUtils';
import { LocalStorageKeys, USER_TYPES } from '../../utils/Constants';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext/UserContext';
import { IUserContext } from '../../context/UserContext/Types';
import AppRoutes from '../../routes/routes';
import BidderActiveBidsContext from '../../context/BidderActiveBids/BidderActiveBidsContext';
import { IBidderActiveBidsContextType } from '../../context/BidderActiveBids/Types';



export default function Login() {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
  const [loginDisabled, setLoginDisabled] = useState<boolean>(true)

  const { setUser } = useContext(UserContext) as IUserContext
  const bidderActiveBids = useContext(BidderActiveBidsContext) as IBidderActiveBidsContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (email && password) {
      setLoginDisabled(false)
    } else {
      setLoginDisabled(true)
    }
  }, [email, password])

  const setBidderActiveBids = async () => {
    try {
      const result = await GetCurrentAcceptedBids()
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

	const handleSubmit = async () => {
    try {
      const result = await LoginUser({email, password})
      console.log(result)
      if (result.error) {
        toast.error(result.error.message)
        return
      }
      CommonUtils.setItemInLocalStorage(LocalStorageKeys.USER_TOKEN, result.token)
      CommonUtils.setItemInLocalStorage(LocalStorageKeys.USER_DETAILS, JSON.stringify(result.user))
      setUser(result.user)
      toast.success("Login Successful")
      if (result.user.role === USER_TYPES.BID_CREATOR) {
        navigate(AppRoutes.CREATE_BID)
      } else { // BIDDER
        setBidderActiveBids()
        navigate(AppRoutes.BIDS_LEADERBOARD)
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong! Please try again")
    }
  }

  return (
      <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
        <LoginController>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="div" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loginDisabled}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/signup"}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </LoginController>
      </Container>
  );
}