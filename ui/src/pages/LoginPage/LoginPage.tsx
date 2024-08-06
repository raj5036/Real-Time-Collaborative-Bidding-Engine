import {useState} from 'react';
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
import { LoginUser } from '../../utils/ApiClient';
import { LoginController } from './LoginPageStyles';
import { CommonUtils } from '../../utils/CommonUtils';
import { LocalStorageKeys } from '../../utils/Constants';
import { toast } from 'react-toastify';



export default function Login() {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")

  const navigate = useNavigate()

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
      toast.success("Login Successful")
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong! Please try again")
    }
  }

  return (
      <Container component="main" maxWidth="xs">
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