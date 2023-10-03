import { Stack } from '@chakra-ui/react';
import ProviderForm from '../components/providerForm.jsx';
import SupportImage from '../components/supportImage.jsx';

export default function ProviderRegisterPage() {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>        
        <SupportImage/>
        <ProviderForm/>
      </Stack>
    )
  }