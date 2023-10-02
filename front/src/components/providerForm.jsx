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


const providerFormFields = [
    {
        pageNumber: 1,
        fields: [
          {
            label: "Especialidade",
            type: "text"
          },
          {
            label: "Telefone",
            type: "tel"
          },
          {
            label: "Celular",
            type: "text"
          },
          {
            label: "Email para contato",
            type: "text"
          }
        ]
    },
    {
        pageNumber: 2,
        fields: [
          {
            label: "Abertura",
            type: "time"
          },
          {
            label: "Fechamento", 
            type: "time"
          },
          {
            label: "CEP",
            type: "text"
          },
          {
            label: "Número",
            type: "number"
          },
          {
            label: "Complemento",
            type: "text"
          }, 
          {
            label: "Ponto de referência",
            type: "text"
          }
        ]
    },
    {
        pageNumber: 3,
        fields: [
          {
            label: "Serviço", 
            type: "text"
          },
          {
            label: "Valor",
            type: "number"
          },
          {
            label: "Descrição",
            type: "text"
          }
        ]
    }
]

export default function ProviderForm({ onClick }) {
    const [page, setPage] = useState(0);

    return (
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Stack spacing={4} w={'full'} maxW={'md'}>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Image w={{base: 12, lg: 16}} src={logo} />
        </Box>
        <Text mt={-4} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.400'}>Preencha com seus dados</Text>
        {
          providerFormFields[page].fields.map((field) => {
            return (
              <FormControl id={field.label.toLowerCase()}>
                <FormLabel>{field.label}</FormLabel>
                <Input type={field.type} />
              </FormControl>
            )
          })
        }
        <Stack spacing={6}>
          <Button colorScheme={'blue'} variant={'solid'} onClick={() => {navigate(-1)}}>
            Continuar
          </Button>
          <Button colorScheme={'gray'} variant={"outline"} onClick={onClick}>
            Voltar
          </Button>
        </Stack>
      </Stack>
    </Flex>
    )
}