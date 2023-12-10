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
import WithSubnavigation from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const PricesPage = () => {
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
              Nossos preços
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
          Os preços dos serviços variam de acordo com os prestadores de serviços, não há tabela de preços.
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

export default PricesPage