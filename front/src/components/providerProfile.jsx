import { Box, Flex } from '@chakra-ui/react';
import ProfileNavBar from '../components/profileNavBar';
import Chats from './chats';
import ProviderProfileData from './providerProfileData';
import ProviderAppointments from './providerAppointments';
import ProviderAgenda from './providerAgenda';

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
                    <ProviderAppointments />
                </Box>
                <Flex 
                  w={{base: "100%", lg: "50%"}}
                  flexDir={{base: "column", md: "row"}}
                >
                    {/* Agenda, Times and Services */}
                    <ProviderAgenda />
                </Flex>
            </Flex>
        </Box>
    )
}