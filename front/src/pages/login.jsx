import { Stack } from '@chakra-ui/react';
import Loginform from "../components/loginform.jsx";
import SupportImage from '../components/supportImage.jsx';
import LoginformProvider from '../components/loginformprovider.jsx';

export default function Loginpage() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>        
      <SupportImage/>
      {localStorage.userType === 'cliente'
      ? <Loginform/>
      : <LoginformProvider />}
    </Stack>
  )
}