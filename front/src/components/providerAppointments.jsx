import {
  Flex,
  Text,
  Heading,
  Image,
  IconButton,
  SimpleGrid,
  Tag
} from '@chakra-ui/react'
import { PhoneIcon, TimeIcon, ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import haircut from "../assets/image15.png"

let today = new Date();

const appointments = [
  {
    id: 0,
    clientName: "Pedro Silva",
    clientPhone: "(81)99601-2721",
    pic: haircut,
    service: "Corte simples",
    price: "R$25,00",
    paymentMethod: "Cartão",
    time: "10:00 - 11:00"
  },
  {
    id: 1,
    clientName: "José João",
    clientPhone: "(81)98722-9611",
    pic: haircut,
    service: "Corte com degradê",
    price: "R$40,00",
    paymentMethod: "Cartão",
    time: "11:00 - 12:00"
  },
  {
  id: 2,
    clientName: "Pietro Lima",
    clientPhone: "(81)99601-2721",
    pic: haircut,
    service: "Corte simples",
    price: "R$25,00",
    paymentMethod: "Cartão",
    time: "10:00 - 11:00"
  },
  {
    id: 3,
    clientName: "Eduardo Gusmão",
    clientPhone: "(81)98722-9611",
    pic: haircut,
    service: "Corte com degradê",
    price: "R$40,00",
    paymentMethod: "PIX",
    time: "11:00 - 12:00"
  }
]

function Appointment({ appointment }) {
  return(
    <Flex border={"1px solid #DADDE2"} borderRadius={4}>
      <Flex>
        <Image src={appointment.pic} w={{base: 28}}/>
      </Flex>
      <Flex flexDir={"column"} pl={2} mt={1}>
        <Text fontWeight={"semibold"}>{appointment.clientName}</Text>
        <Text fontWeight={"semibold"} fontSize={"sm"} mt={-1}>{appointment.service}</Text>
        <Flex mt={1} color={'gray.500'}>
          <TimeIcon />
          <Text mt={-0.5} ml={1} fontSize={{base: 12, lg: 12}}>{appointment.time}</Text>
        </Flex>
        <Flex mt={1} color={'gray.500'}>
          <PhoneIcon />
          <Text mt={-0.5} ml={1} fontSize={{base: 12, lg: 12}}>{appointment.clientPhone}</Text>
        </Flex>
        <Flex mt={1} color={'gray.500'}>
          <ChatIcon />
          <Text mt={-0.5} ml={1} fontSize={{base: 12, lg: 12}}>Envie uma mensagem</Text>
        </Flex>
      </Flex>
      <Flex 
        ml="auto" 
        h={7} 
        my={2} 
        flexDir={{base: "column",md:"row"}}
        mt={{base: 2, md: 0}}
      >
        <Tag 
          mr={{base: "auto", md: 1}}
          py={2} 
          px={4}
          mt={{base: 2, md: 2}}
          bgColor={"green.300"}
        >
          {appointment.paymentMethod}
        </Tag>
        <Tag 
          mr={{base: 2, md: 0}}
          py={2} 
          px={4} 
          mt={{base: 2, md: 2}}
          bgColor={"blue.300"}
        >
          {appointment.price}
        </Tag>
        <IconButton
          order={{base: -1, md: 0}}
          size={"sm"}
          aria-label="Dropdown-menu"
          icon={<ChevronDownIcon />}
          bg="transparent"
          _hover={{
              transform: "scale(1.4)"
          }}
        />
      </Flex>
    </Flex>
  )
}


export default function ProviderAppointments() {
  return (
    <Flex mb={4} mx={6}  flexDir={"column"} >
      <Heading size="md" mb={2}>
          Agendamentos {today.getDate() + "/" + (today.getMonth() + 1)} 
      </Heading>
      <SimpleGrid p={3} spacing={2} border={"1px solid #DADDE2"} borderRadius={4}>
      {appointments.map((appointment) => {
          return (
              <Appointment appointment={appointment} key={appointment.id} />
          )
      })}
      </SimpleGrid>
    </Flex>
  )
}