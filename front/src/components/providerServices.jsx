import {
  Flex, 
  Button, 
  Text,
  IconButton,
  Heading
}
from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function ProviderServices() {
  const services = [
    {
      id: 0,
      name: "Corte simples",
      price: "R$25,00"
    },
    {
      id: 1,
      name: "Corte com degradê",
      price: "R$40,00"
    },
    {
      id: 2,
      name: "Corte + lavagem",
      price: "R$55,00"
    },
    {
      id: 3,
      name: "Barboterapia",
      price: "R$25,00"
    },
    {
      id: 4,
      name: "Cote + Barboterapia",
      price: "R$50,00"
    },
  ]

  return(
    <Flex 
      flexDir={"column"} 
      vw={{base: "100%", md:0}}
      w={{base: "100%", md:"100%"}}
      mr={{base: 6, md: 6}}
      my={{base: 4, md: 0}}
    >
      <Heading size="md" mb={2}>
        Meus serviços        
      </Heading>
      <Flex flexDir={"column"} border={"1px solid #DADDE2"} borderRadius={4} p={2}>
        <Button colorScheme={'blue'} variant={'solid'} mb={2}>
          Adicionar Serviço
        </Button>
        {services.map((service) => {
          return(
            <Flex mb={2} border={"1px solid #547FFF"} borderRadius={4} >
              <Flex flexDir={"column"} fontWeight={"semibold"}>
                <Text
                  m={2}
                  mb={-2}
                >
                  {service.name}
                </Text>
                <Text
                  m={2}
                >
                  {service.price}
                </Text>
              </Flex>
              <IconButton
                ml={"auto"}
                size={"sm"}
                aria-label="Dropdown-menu"
                icon={<ChevronDownIcon />}
                bg="transparent"
              />
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}