import {
  Flex,
  Text,
  IconButton,
  Heading,
  Divider,
  Box,
} from '@chakra-ui/react'
import { ArrowUpDownIcon } from "@chakra-ui/icons";

const users = [
    {
        id: 0,
        firstName: "Eddie",
        lastName: "Brock",
        picture: null,
        lastMessage: "Lorem ipsum dolor sit amet, consectetur adsplicing elit. Etiam in mollis quam."
    },
    {
        id: 1,
        firstName: "Gwen",
        lastName: "Stacy",
        picture: null,
        lastMessage: "Lorem ipsum dolor sit amet, consectetur adsplicing elit. Etiam in mollis quam."
    },
]

function Chat({ user }) {
    return (
        <Flex m={2} >
            {(user.picture === null) ? (
                    //<Text>{user.firstName[0] + user.lastName[0]}</Text>
                    <Flex 
                      bg="yellow.100"
                      w={8}  
                      h={8}
                      justifyContent="center"
                      alignItems="center"
                      borderRadius="50%"
                      border="1px solid"
                      borderColor="black"
                      fontSize={12}
                      fontWeight="semibold"
                      color="yellow.400"
                    >
                        {user.firstName[0] + user.lastName[0]}
                    </Flex>
                ) : (
                    <Image src={user.picture} />
                )
                }
            <Flex flexDir={"column"} pl={2}>
                <Text 
                  fontSize={12} 
                  fontWeight={"medium"}
                >
                    {user.firstName + " " +user.lastName}
                </Text>
                <Text 
                  fontSize={10} 
                  color={'gray.400'}
                >
                    {user.lastMessage}
                </Text>
            </Flex>
        </Flex>
    )
}

export default function Chats() {
    return (
        <Flex 
            my={4} 
            mr={{base: 6,lg:4}} 
            flexDir={"column"} 
            border={"1px solid #DADDE2"} 
            borderRadius={8} 
            ml={{base: 6, lg: 0}}
        >
            <Flex py={2} >
                <Heading size={"md"} mt={2} ml={2} >Chats</Heading>
                <IconButton
                  ml="auto"
                  mt={-0.5}
                  aria-label="Notifications"
                  icon={<ArrowUpDownIcon />}
                  bg="transparent"
                  _hover={{
                    transform: "scale(1.4)"
                }}
                />
            </Flex>
            <Flex flexDir={"column"}>
                {users.map((user) => {
                    return (
                        <Box>
                            <Chat key={user.id} user={user} />
                            <Divider />
                        </Box>
                    )
                })}
            </Flex>
        </Flex>
    )
}