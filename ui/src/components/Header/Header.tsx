import ToggleColorMode from '../ToggleColorMode/ToggleColorMode';
import { HeaderStyles } from './HeaderStyles';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useTheme } from '@mui/material/styles';

const Header = () => {
	const theme = useTheme()
	
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
			<ToggleColorMode />
		</HeaderStyles.Box>
	);
};

export default Header;