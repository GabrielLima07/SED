import { Stack } from '@chakra-ui/react';
import RegisterForm from "../components/registerForm";
import SupportImage from '../components/supportImage.jsx';

export default function RegisterPage() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>        
      <SupportImage/>
      <RegisterForm/>
    </Stack>
  )
}