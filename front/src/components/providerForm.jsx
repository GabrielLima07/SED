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
import { useState } from 'react';

// TODO: create dynamic form fields
// TODO: insert inputs types
const providerFormFields = [
    {
        pageNumber: 1,
        fields: [
            "Especialidade", 
            "Telefone", 
            "Celular", 
            "Email para contato"
        ]
    },
    {
        pageNumber: 2,
        fields: [
            "Abertura", 
            "Fechamento", 
            "CEP", 
            "Número",
            "Complemento",
            "Ponto de referência"
        ]
    },
    {
        pageNumber: 3,
        fields: [
            "Serviço", 
            "Valor", 
            "Descrição", 
        ]
    }
]

export default function ProviderForm() {
    const [page, setPage] = useState(1);

    return (
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Stack spacing={4} w={'full'} maxW={'md'}>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Image w={{base: 12, lg: 16}} src={logo} />
        </Box>
        <Text mt={-4} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.400'}>Preencha com seus dados</Text>
        {/* mapped array */}
        {
            providerFormFields[page].fields.map((field) => {
              <FormControl id="{field.toLowerCase()}">
                <FormLabel>{field}</FormLabel>
                <Input type="password-confirm" />
              </FormControl>
            })
        }
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