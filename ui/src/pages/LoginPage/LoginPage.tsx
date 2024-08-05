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
import { Link } from 'react-router-dom';
import { LoginUser } from '../../utils/ApiClient';



export default function Login() {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const handleSubmit = async () => {
    try {
      const user = await LoginUser({email, password});
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
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
        </Box>
      </Container>
  );
}