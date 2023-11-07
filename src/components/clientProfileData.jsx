import {
  Flex,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { EditIcon, BellIcon } from "@chakra-ui/icons";

const clientData = {
    firstName: "John",
    lastName: "Jameson",
    email: "jjonahj@gmail.com",
    phone: "(81) 997123302",
    CPF: "074.120.9910-91",
    picture: null
}

export default function ClientProfileData() {
    return (
        <Flex m={8}>
            <Flex
              bg="blue.100"
              w={{base: 28, lg: 120}}  
              h={{base: 28, lg: 120}}
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              border="1px solid"
              borderColor="black"
              fontSize={{base: 24, lg: 28}}
              fontWeight="semibold"
              color="blue.400"
            >
                {/* profile pic */}
                {(clientData.picture === null) ? (
                    <Text>{clientData.firstName[0] + clientData.lastName[0]}</Text>
                ) : (
                    <Image src={clientData.picture} />
                )
                }
            </Flex>
            <Flex pb={{base: 3}} pt={{base: 4, lg: 2}} pl={{base: 4}} flexDir={"column"}>
                <Text fontWeight="semibold" fontSize={{base: 16, lg: 20}}>{clientData.firstName + " " + clientData.lastName}</Text>
                <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{clientData.email}</Text>
                <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{clientData.phone}</Text>
                <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{clientData.CPF}</Text>
            </Flex>
            <Flex flexDir={"column"} pt={0.5} ml={"auto"}>
                <IconButton
                  mt={{base: 2, lg: 0}}
                  size={{base: "md", lg: "lg"}}
                  aria-label="Edit"
                  icon={<EditIcon />}
                  bg="transparent"
                  _hover={{
                    transform: "scale(1.2)"
                    }}
                />
                <IconButton
                  size={{base: "md", lg: "lg"}}
                  aria-label="Notifications"
                  icon={<BellIcon />}
                  bg="transparent"
                  _hover={{
                      transform: "scale(1.4)"
                  }}
                />
            </Flex>
        </Flex>
    )
}