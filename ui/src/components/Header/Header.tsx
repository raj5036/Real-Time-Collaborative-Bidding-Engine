import { Box, Button } from '@mui/material';
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode';
import { HeaderStyles } from './HeaderStyles';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import { IUserContext } from '../../context/UserContext/Types';
import { Link } from 'react-router-dom';
import { CommonUtils } from '../../utils/CommonUtils';
import { LocalStorageKeys, USER_TYPES } from '../../utils/Constants';
import { toast } from 'react-toastify';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarContext from '../../context/SidebarContext/SidebarContext';
import { ISideBarContext } from '../../context/SidebarContext/Types';
import AppRoutes from '../../routes/routes';
import Notification from '../Notification/Notification';
import { IUser } from '../../utils/Types';

const Header = () => {
	const theme = useTheme()
	const { user, setUser } = useContext(UserContext) as IUserContext
	const { setSidebarOpen } = useContext(SidebarContext) as ISideBarContext

	const handleLogout = () => {
		setUser({} as IUser)
		CommonUtils.removeItemFromLocalStorage(LocalStorageKeys.USER_TOKEN)
		toast.success("Logout Successful")
	}

	const handleOpenSidebar = () => {
		setSidebarOpen(true)
	}
	
	return (
		<HeaderStyles.Box>
			<HeaderStyles.AppNameContainer>
				<MenuIcon 
					className="menu-icon"
					onClick={handleOpenSidebar}	
				/>
				<CurrencyExchangeIcon 
					color={theme.palette.mode === 'dark' ? 'info' : 'warning'}
					fontSize='large'
				/>
				<HeaderStyles.AppName>
					Bidding Platform
				</HeaderStyles.AppName>
			</HeaderStyles.AppNameContainer>
			<Box className="header-right">
				{user.role === USER_TYPES.BIDDER && <Notification />}
				<ToggleColorMode />
				<Button
					variant='contained'
					onClick={handleLogout}
					className='logout-button'
				>
					<Link to={AppRoutes.LOGIN}>Log out</Link>
				</Button>
			</Box>
		</HeaderStyles.Box>
	);
};

export default Header;