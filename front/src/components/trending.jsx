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
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authContext";

const trending = [
  {
    label: "Don Black Tattoo",
    href: "#",
    picture: trending2,
    address: "Rua do Saudade, 25, Santo Amaro, Recife",
    stars: 5.0,
    email: "dbt@gmail.com"
  },
  {
    label: "Lara - Personal trainer",
    href: "#",
    picture: "https://img.freepik.com/premium-photo/young-female-fitness-personal-trainer-with-notepad-standing-gym-with-thumb-up_146671-31563.jpg",
    address: "A combinar",
    stars: 5.0,
    email: "lpt@gmail.com"
  },
  {
      label: "Radio Spider Barbershop",
      href: "#",
      picture: trending1,
      address: "Rua do Princípe, 225, Boa Vista, Recife",
      stars: 5.0,
      email: "rsb@gmail.com"
  }, 
  {
      label: "Marta - Nails designer",
      href: "#",
      picture: trending3,
      address: "A domicílio",
      stars: 5.0,
      email: "mnd@gmail.com"
  },
  
]

function TredingCard({data}) {
  const navigate = useNavigate();
  const { logado } = useAuth();

  const navigateToProfile = (email) => {
    if(logado) {
      navigate(`/prestador/${email}`)
    } else {
      navigate(`/login`)
    }
  }

  return (
    <Flex  alignItems="center" justifyContent="center">
      
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="xs"
        position="relative"
        _hover={{
          transform: 'scale(1.02)', 
          transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out'
        }}
        transition="box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out"
        cursor={"pointer"}
        onClick={() => navigateToProfile(data.email)}
        >
        
        <Image w={260} src={data.picture} alt={`Picture of ${data.label}`} roundedTop="lg" />
      
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
    columns={{base: 1, md: 2, lg: 4}} spacing={2}>
      {/* <TredingCard/> */}
      {trending.map((item) => {
        return <TredingCard key={item.label} data={item}/>
      })}
    </SimpleGrid>
  )
}