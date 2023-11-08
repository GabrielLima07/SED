import { Box, Flex } from '@chakra-ui/react';
import ProfileNavBar from '../components/profileNavBar';
import Chats from './chats';
import ProviderProfileData from './providerProfileData';

export default function ProviderProfile() {
    return (
        <Box>
            <ProfileNavBar />
            <Flex flexWrap={"wrap"}>
                <Box w={{base: "100%", lg: "50%"}}>
                    <ProviderProfileData />
                </Box>
                <Box w={{base: "100%", lg: "50%"}}>
                    {/* Chats */}
                    <Chats />
                </Box>
                <Box w={{base: "100%", lg: "50%"}}>
                    {/* ProviderAppointments */}
                    
                </Box>
                <Box w={{base: "100%", lg: "50%"}}>
                    {/* Agenda, Times and Services */}
                    
                </Box>
            </Flex>
        </Box>
    )
}