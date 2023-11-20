import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Homepage from './pages/homepage.jsx';
import Loginpage from './pages/login.jsx';
import RegisterPage from './pages/register';
import ProviderRegisterPage from './pages/providerRegister.jsx';
import ClientRegisterPage from './pages/clientRegister.jsx';
import Profile from './pages/Profile.jsx';
import ErrorComponent from './components/errorComponent.jsx';
import { ColorModeScript } from "@chakra-ui/color-mode";
import theme from './theme.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "login",
        element: <Loginpage />
      },
      {
        path: "register",
        element: <RegisterPage/>
      },
      {
        path: "register/provider-form/:page",
        element: <ProviderRegisterPage />,
        errorElement: <ErrorComponent />
      },
      {
        path: "register/provider-form/4",
        //element: <UserProfile />
        element: <Navigate to="/" />
      },
      {
        path: "register/client-form",
        element: <ClientRegisterPage />
      },
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "*",
        element: <ErrorComponent />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>,
)
 