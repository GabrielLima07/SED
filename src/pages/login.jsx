import { Stack } from '@chakra-ui/react';
import Loginform from "../components/loginform.jsx";
import SupportImage from '../components/supportImage.jsx';

export default function Loginpage() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>        
      <SupportImage/>
      <Loginform/>
    </Stack>
  )
}