import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from '../App';
import Homepage from '../pages/homepage';
import Loginpage from '../pages/login';
import RegisterPage from '../pages/register';
import ProviderRegisterPage from '../pages/providerRegister';
import ClientRegisterPage from '../pages/clientRegister';
import Profile from '../pages/Profile';
import ErrorComponent from '../components/errorComponent';
import SearchResultsPage from '../pages/searchResultsPage';
import ClientViewProviderProfile from '../pages/clientViewProviderProfile';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import UserType from '../pages/userType';
import AboutUs from '../pages/aboutUs';
import ServicesPage from '../pages/servicesPage';
import PricesPage from '../pages/pricesPage';

const PrivateRoute = ({ element, ...rest }) => {
  const navigate = useNavigate();
  const { logado } = useAuth();

  useEffect(() => {
    if (!logado) {
      navigate("/login");
    }
  }, [logado, navigate]);

  return logado ? element : null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: 'login',
        element: <Loginpage />,
      },
      {
        path: 'userTypeLogin',
        element: <UserType />
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'register/provider-form/',
        element: <ProviderRegisterPage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'register/client-form',
        element: <ClientRegisterPage />,
      },
      {
        path: 'profile',
        element: <PrivateRoute element={<Profile />} />,
      },
      {
        path: '/search-results',
        element: <PrivateRoute element={<SearchResultsPage />} />,
      },
      {
        path: '/prestador/:email',
        element: <PrivateRoute element={<ClientViewProviderProfile />} />,
      },
      {
        path: '/sobrenos',
        element: <AboutUs />
      },
      {
        path: '/servicos',
        element: <ServicesPage />
      },
      {
        path: 'precos',
        element: <PricesPage />
      },
      {
        path: '*',
        element: <ErrorComponent />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
} 


