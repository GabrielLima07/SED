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
        element: <ProviderRegisterPage />
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
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>,
)
 