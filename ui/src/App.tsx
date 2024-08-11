import React, { useContext } from 'react'
import ColorModeContext from './context/ColorModeContext/ColorModeContext'
import { ColorModeContextType } from './context/ColorModeContext/Type'
import { createTheme, ThemeProvider } from '@mui/material'
import Theme from './utils/Theme'
import router from './routes/router'
import { RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppStyles } from './AppStyles'



const App: React.FC = () => {
  const {colorMode} =  useContext<ColorModeContextType>(ColorModeContext)

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(Theme(colorMode)), [colorMode]);

  return (
    <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
          <AppStyles.Container>
            <RouterProvider router={router} />
            <ToastContainer 
                  position="bottom-left"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme={theme.palette.mode}
                  transition={Bounce}
              />
            </AppStyles.Container>
        </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
