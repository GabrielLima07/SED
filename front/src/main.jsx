import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from "@chakra-ui/color-mode";
import theme from './theme.jsx';
import AppRouter from './routes/appRouter.jsx';
import { AuthProvider } from './context/authContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AppRouter />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
 