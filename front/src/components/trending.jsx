import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react'

import trending1 from "../assets/barbearia.png";
import trending2 from "../assets/tatuador.png";
import trending3 from "../assets/manicure.png";

const trending = [
  {
    label: "Don Black Tattoo",
    href: "#",
    picture: trending2,
    address: "Rua do Saudade, 25, Santo Amaro, Recife",
    stars: 5.0
  },
  {
      label: "Radio Spider Barbershop",
      href: "#",
      picture: trending1,
      address: "Rua do Princípe, 225, Boa Vista, Recife",
      stars: 5.0
  }, 
  {
      label: "Marinalva - Nails designer",
      href: "#",
      picture: trending3,
      address: "A domicílio",
      stars: 5.0
  }
]

function TredingCard({data}) {
  return (
    <Flex  alignItems="center" justifyContent="center">
      
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="xs"
        position="relative"
        >
        
        <Image  src={data.picture} alt={`Picture of ${data.label}`} roundedTop="lg" />
      
        <Box mt="2" mb="8">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated>
              {data.label}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="sm" color={useColorModeValue('gray.500', 'white')}>
              <Box as="span" color={'gray.600'} fontSize="lg">
              </Box>
              {data.address}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
export default function Trending() {
  return (
    <SimpleGrid
    columns={{base: 1, md: 2, lg: 3}}>
      {/* <TredingCard/> */}
      {trending.map((item) => {
        return <TredingCard data={item}/>
      })}
    </SimpleGrid>
  )
}