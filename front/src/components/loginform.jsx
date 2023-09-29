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
} from '@chakra-ui/react';
import logo from "../assets/logo.png";
import googleIcon from "../assets/google.png";
import microsoftIcon from "../assets/microsoft.png";
import { useNavigate } from 'react-router-dom';


export default function Loginform() {
  const navigate = useNavigate();

  return (
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
          <Text my={-4} textAlign={"center"}>Ou</Text>
          <Button colorScheme={'gray'} variant={"outline"}>
            <Image mx={3} w={"24px"} src={googleIcon} />  
            Continuar com Google
          </Button>
          <Button mt={-4} colorScheme={'gray'} variant={"outline"}>
            <Image mx={3} w={"24px"} src={microsoftIcon} />  
            Continuar com Microsoft
          </Button>
          <Text textAlign={"center"}>Ainda não tem uma conta?
            <Button ml={0.5} as={'a'} color={'blue.600'} fontWeight={400} variant={'link'} cursor={"pointer"}
              onClick={() => {navigate("/register")}}>
              Cadastre-se
            </Button>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  )
}