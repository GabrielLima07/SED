import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import sideimg from "../assets/sammy-line-man-marks-days-on-calendar.png"
import { useNavigate } from 'react-router-dom'

export default function SplitScreen() {
  const navigate = useNavigate();

  return (
    <Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={2} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Salve Essa Data
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
          O sistema de agendamentos que veio para facilitar a sua vida. Seja como prestador de serviço ou cliente, aqui você está a um click de encontrar o serviço que deseja, na hora que você quer e sem perder tempo. Tá esperando o que? Salve Essa Data!
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              onClick={() => {navigate("/login")}}
              borderRadius={8}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              >
              Comece agora
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} justify={"center"}>
        <Image
        // objectFit={"contain"}
          objectFit={"none"}
          src={sideimg}
        />
      </Flex>
    </Stack>
  )
}