import { Stack } from '@chakra-ui/react';
import ClientForm from '../components/clientForm.jsx';
import SupportImage from '../components/supportImage.jsx';

export default function ClientRegisterPage() {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>        
        <SupportImage/>
        <ClientForm />
      </Stack>
    )
  }