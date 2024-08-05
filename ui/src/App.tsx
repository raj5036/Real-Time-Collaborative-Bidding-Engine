import React, { useContext } from 'react'
import ColorModeContext from './context/ColorModeContext/ColorModeContext'
import { ColorModeContextType } from './context/ColorModeContext/Type'
import { createTheme, ThemeProvider } from '@mui/material'
import Theme from './utils/Theme'
import router from './routes/router'
import { RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'


const App: React.FC = () => {
  const {colorMode} =  useContext<ColorModeContextType>(ColorModeContext)

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(Theme(colorMode)), [colorMode]);

  return (
    <ThemeProvider theme={theme}>
       <RouterProvider router={router} />
       <ToastContainer 
            position="top-right"
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
    </ThemeProvider>
  )
}

export default App
