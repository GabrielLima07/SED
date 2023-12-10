import { createContext, useContext, useState } from 'react';
import { getUserData } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedUserData, setLoggedUserData] = useState(null);
  const [logado, setLogado] = useState(localStorage.getItem('userEmail') ? true : false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'))
  const [userType, setUserType] = useState(localStorage.getItem('userType'))

  const login = async (email, senha) => {
    try {
      const result = await getUserData(`clientes/${email}`);
      
      if(result) {
        if (result.email == email && result.senha == senha) {
          setLogado(true);
          setLoggedUserData(result);
          setUserEmail(result.email);
          localStorage.setItem('userEmail', result.email);
        } else {
          alert("email ou senha inválidos!")
        }
      }
    } catch (error) {
      console.log(error)
    }
  };


  const loginPrestador = async (email, senha) => {
    try {
      const result = await getUserData(`prestador-de-servico/${email}`);
 
      if(result) {
        if (result.email == email && result.senha == senha) {
          setLogado(true);
          setLoggedUserData(result);
          setUserEmail(result.email);
          localStorage.setItem('userEmail', result.email);
        } else {
          alert("email ou senha inválidos!")
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  const logout = () => {
    setLogado(false);
    setLoggedUserData(null);
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ loggedUserData, logado, login, logout, userEmail, userType, loginPrestador }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
