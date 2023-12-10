import React from 'react'
import { 
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import WithSubnavigation from './../components/navbar';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <WithSubnavigation />
      <Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }} ml={-1.5}>
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
              Sobre nós
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
          O Salve Essa Data (SED) trata-se de um sistema de agendamentos onde prestadores de serviços podem disponibilizar seus serviços, assim como sua agenda, permitindo que clientes possam acessar seu perfil e marcar seus agendamentos de forma simples, rápida e prática
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              onClick={() => {navigate("/register")}}
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
      </Flex>
      </Stack>
    </Box>
  )
}

export default AboutUs