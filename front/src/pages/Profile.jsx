import { Box } from '@chakra-ui/react';
import ClientProfile from '../components/clientProfile';
import ProviderProfile from '../components/providerProfile';

export default function Profile() {

    return (
        <Box>
            {localStorage.userType == 'cliente'
            ? <ClientProfile />
            : <ProviderProfile />}
        </Box>
    )
}