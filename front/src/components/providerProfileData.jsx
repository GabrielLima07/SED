import {
  Flex,
  Text,
  IconButton,
  Image
} from '@chakra-ui/react'
import { EditIcon, BellIcon, StarIcon } from "@chakra-ui/icons";

const providerData = {
  name: "Crazy Wayne",
  rate: "4.7",
  servicesType: "Barbearia",
  phone: "(81) 996012721",
  workingDays: "Seg - Sex",
  workingHours: "09:00 - 17:00",
  address: "Rua do principe, 1182 - Boa Vista",
  picture: "https://i.pinimg.com/originals/8f/e4/db/8fe4db218174c828f1fe1b637bb6810f.jpg",

  firstName: "John",
  lastName: "Jameson",
  email: "jjonahj@gmail.com",
  CPF: "074.120.9910-91"
}

export default function ProviderProfileData() {
  return (
    <Flex m={8}>
      <Flex
        bg="purple.100"
        w={{base: 28, lg: 120}}  
        h={{base: 28, lg: 120}}
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        border="1px solid"
        borderColor="black"
        fontSize={{base: 24, lg: 28}}
        fontWeight="semibold"
        color="purple.400"
      >
          <Image src={providerData.picture} maxW="100%"maxH="100%" borderRadius="50%" />
      </Flex>
      <Flex pb={{base: 3}} pt={{base: 2, lg: 0}} pl={{base: 4}} flexDir={"column"}>
          <Text fontWeight="semibold" fontSize={{base: 16, lg: 20}}>{providerData.name}</Text>
          <Flex>
            <StarIcon />
            <Text color={'gray.400'} fontSize={{base: 12, lg: 14}} ml={1}>{providerData.rate}</Text>  
            <Text color={'gray.400'} fontSize={{base: 12, lg: 14}} ml={1}>{providerData.servicesType}</Text>  
          </Flex>
          <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{providerData.phone}</Text>
          <Flex>
            <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{providerData.workingDays}</Text>
            <Text color={'gray.400'} fontSize={{base: 12, lg: 14}} ml={1}>{providerData.workingHours}</Text>
          </Flex>
          <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{providerData.address}</Text>
      </Flex>
      <Flex flexDir={"column"} pt={0.5} ml={"auto"}>
          <IconButton
            mt={{base: 2, lg: 0}}
            aria-label="Edit"
            icon={<EditIcon />}
            bg="transparent"
            _hover={{
              transform: "scale(1.2)"
              }}
          />
          <IconButton
            aria-label="Notifications"
            icon={<BellIcon />}
            bg="transparent"
            _hover={{
                transform: "scale(1.2)"
            }}
          />
      </Flex>
    </Flex>
  )  
}