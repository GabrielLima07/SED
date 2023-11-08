import { Box, Flex } from '@chakra-ui/react';
import ProfileNavBar from '../components/profileNavBar';
import ClientProfileData from './clientProfileData';
import Chats from './chats';
import ClientAppointments from './clientAppointments';
import PreviousClientAppointments from './previousClientAppointments';

export default function ClientProfile() {
    return (
        <Box>
            <ProfileNavBar />
            <Flex flexWrap={"wrap"}>
                <Box w={{base: "100%", md: "50%"}}>
                    <ClientProfileData />
                </Box>
                <Box w={{base: "100%", md: "50%"}}>
                    <Chats />
                </Box>
                <Box w={{base: "100%", lg: "50%"}}>
                    <ClientAppointments />
                </Box>
                <Box w={{base: "100%", lg: "50%"}}>
                    <PreviousClientAppointments />
                </Box>
            </Flex>
        </Box>
    )
}