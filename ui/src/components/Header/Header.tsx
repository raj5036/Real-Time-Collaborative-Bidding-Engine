import { Box, Button } from '@mui/material';
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode';
import { HeaderStyles } from './HeaderStyles';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import { IUser, IUserContext } from '../../context/UserContext/Types';
import { useNavigate } from 'react-router-dom';
import { CommonUtils } from '../../utils/CommonUtils';
import { LocalStorageKeys } from '../../utils/Constants';
import { toast } from 'react-toastify';

const Header = () => {
	const theme = useTheme()
	const { setUser } = useContext(UserContext) as IUserContext
	const navigate = useNavigate()

	const handleLogout = () => {
		setUser({} as IUser)
		CommonUtils.removeItemFromLocalStorage(LocalStorageKeys.USER_TOKEN)
		CommonUtils.removeItemFromLocalStorage(LocalStorageKeys.USER_DETAILS)
		navigate('/login')
		toast.success("Logout Successful")
	}
	
	return (
		<HeaderStyles.Box>
			<HeaderStyles.AppNameContainer>
				<CurrencyExchangeIcon 
					color={theme.palette.mode === 'dark' ? 'info' : 'warning'}
					fontSize='large'
				/>
				<HeaderStyles.AppName>
					Bidding Platform
				</HeaderStyles.AppName>
			</HeaderStyles.AppNameContainer>
			<Box className="header-right">
				<ToggleColorMode />
				<Button
					variant='contained'
					onClick={handleLogout}
				>
					Log out
				</Button>
			</Box>
		</HeaderStyles.Box>
	);
};

export default Header;