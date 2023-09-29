import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Image,
  Box
} from '@chakra-ui/react';
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(<GeneralRegisterForm/>)

  return (
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      {form}
    </Flex>
  )
}

function GeneralRegisterForm() {
  return (
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Stack spacing={4} w={'full'} maxW={'md'}>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Image w={{base: 12, lg: 16}} src={logo} />
        </Box>
        <Text mt={-4} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.400'}>Preencha com seus dados</Text>
        <FormControl id="name">
          <FormLabel>Nome</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="CPF">
          <FormLabel>CPF</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Senha</FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Confirmar senha</FormLabel>
          <Input type="password-confirm" />
        </FormControl>
        <Stack spacing={6}>
          <Stack
            direction={{ base: 'column'}}
            align={'start'}
            justify={'space-between'}>
            <Text>Desejo:</Text>
            <Checkbox id="checkbox-cliente">Agendar serviços</Checkbox>
            <Checkbox id="checkbox-provider">Prestar serviços</Checkbox>
          </Stack>
          <Button colorScheme={'blue'} variant={'solid'} onClick={() => {navigate(-1)}}>
            Continuar
          </Button>
          <Button colorScheme={'gray'} variant={"outline"} onClick={() => {navigate(-1)}}>
            Voltar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}