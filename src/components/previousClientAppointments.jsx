import {
    Flex,
    Text,
    Heading,
    Image,
    IconButton,
    SimpleGrid,
    Tag
  } from '@chakra-ui/react'
  import { CalendarIcon, TimeIcon, TriangleDownIcon, ChevronDownIcon } from "@chakra-ui/icons";
  
  const appointments = [
      {
          id: 0,
          provider: "Crazy Wayne",
          service: "Corte simples",
          date: "10/10",
          time: "19:00",
          address: "Rua do principe, 1182 - Boa vista",
          price: "R$25,00",
          pic: "https://cdn.shopify.com/s/files/1/1525/8012/files/stephen_480x480.jpg"
      },
      {
          id: 1,
          provider: "Crazy Wayne",
          service: "Corte infantil",
          date: "10/10",
          time: "19:00",
          address: "Rua do principe, 1182 - Boa vista",
          price: "R$35,00",
          pic: "https://www.neuralbalance.com/cdn/shop/articles/AdobeStock_139598307_1500x.jpeg"
      },
      {
        id: 2,
        provider: "Crazy Wayne",
        service: "Corte simples",
        date: "10/10",
        time: "19:00",
        address: "Rua do principe, 1182 - Boa vista",
        price: "R$25,00",
        pic: "https://cdn.shopify.com/s/files/1/1525/8012/files/stephen_480x480.jpg"
    },
    {
        id: 3,
        provider: "Crazy Wayne",
        service: "Corte infantil",
        date: "10/10",
        time: "19:00",
        address: "Rua do principe, 1182 - Boa vista",
        price: "R$35,00",
        pic: "https://www.neuralbalance.com/cdn/shop/articles/AdobeStock_139598307_1500x.jpeg"
    }
  ]
  
  
  function Appointment({ appointment }) {
      return (
          <Flex
            border="1px solid lightgray"
          >
              <Image src={appointment.pic} w={32} h={32}/>
              <Flex flexDir={"column"} pl={3}>
                  <Text color={'gray.500'} fontSize={{base: 12, lg: 14}}>{appointment.provider}</Text>
                  <Text fontWeight="semibold" fontSize={{base: 14, lg: 16}}>{appointment.service}</Text>
                  <Flex my={1}>
                      <CalendarIcon />
                      <Text mt={-0.5} ml={1} color={'gray.700'} fontSize={{base: 12, lg: 14}}>{appointment.date}</Text>
                  </Flex>
                  <Flex my={1}>
                      <TimeIcon />
                      <Text mt={-0.5} ml={1} color={'gray.700'} fontSize={{base: 12, lg: 14}}>{appointment.time}</Text>
                  </Flex>
                  <Flex my={1}>
                      <TriangleDownIcon />
                      <Text mt={-0.5} ml={1} color={'gray.700'} fontSize={{base: 12, lg: 14}}>{appointment.address}</Text>
                  </Flex>
              </Flex>
              <Tag p={2} bgColor={"blue.300"} h={8} ml="auto" my={2}>
                  {appointment.price}
              </Tag>
              <IconButton
                    size={"md"}
                    aria-label="Notifications"
                    icon={<ChevronDownIcon />}
                    bg="transparent"
                    _hover={{
                        transform: "scale(1.4)"
                    }}
                  />
          </Flex>
      )
  }
  
  export default function PreviousClientAppointments() {
      return (
          <Flex m={4} p={2} flexDir={"column"}>
              <Heading size="md" ml={2}>
                  Agendamentos anteoriores
              </Heading>
              <SimpleGrid m={2} spacing={2}>
              {appointments.map((appointment) => {
                  return (
                      <Appointment appointment={appointment} key={appointment.id} />
                  )
              })}
              </SimpleGrid>
          </Flex>
      )
  }