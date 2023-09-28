import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    Box
} from '@chakra-ui/react'
import logo from "../assets/logo.png"
import googleIcon from "../assets/google.png"
import microsoftIcon from "../assets/microsoft.png"

export default function Loginpage() {
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>        
          <Flex flex={1}>
            <Image
              alt={'Login Image'}
              objectFit={'cover'}
              src={'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'}
            />
          </Flex>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Image w={{base: 12, lg: 16}} src={logo} />
              </Box>
              <Heading fontSize={'2xl'}>Bem vindo!</Heading>
              <Text mt={-4} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.400'}>Insira seus dados abaixo</Text>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Lembrar de mim</Checkbox>
                  <Text color={'blue.500'}>Esqueceu a senha?</Text>
                </Stack>
                <Button colorScheme={'blue'} variant={'solid'}>
                  Entrar
                </Button>
                <Text textAlign={"center"}>Ou</Text>
                <Button colorScheme={'gray'} variant={"outline"}>
                  <Image mx={3} w={"24px"} src={googleIcon} />  
                  Continuar com Google
                </Button>
                <Button mt={-4} colorScheme={'gray'} variant={"outline"}>
                  <Image mx={3} w={"24px"} src={microsoftIcon} />  
                  Continuar com Microsoft
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      )
}