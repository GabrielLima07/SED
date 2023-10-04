import {
  Button,
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
import { providerFormFields } from "../data/formsFields"
import { useNavigate, useParams } from 'react-router-dom';

export default function ProviderForm() {
  const { page } = useParams()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});


  const checkInputFieldsValues = () => {
    // se algum dos campos não estiver preenchido vai retornar false
    let arr = [...document.getElementsByClassName("input-fields")];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value === "") {
        return false
      }
    }
    return true;
  }


  const handleContinuarButton = () => {
    // redireciona p/ próxima página se todos os campos foram preenchidos
    if (checkInputFieldsValues()) {
      navigate(`/register/provider-form/${parseInt(page) + 1}`)
    } else {
      alert("Preencha todos os campos do formulário para prosseguir")
    }
  };


  const handleInputChange = (event) => {
    // armazena os dados inseridos nos inputs em um objeto
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  
  return (
  <Flex p={8} flex={1} align={'center'} justify={'center'}>
    <Stack spacing={4} w={'full'} maxW={'md'}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Image w={{base: 12, lg: 16}} src={logo} />
      </Box>
      <Text mt={-4} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.400'}>Preencha com seus dados</Text>
      {
        providerFormFields[page - 1].fields.map((field) => {
          return (
            <FormControl isRequired id={field.label.toLowerCase()} key={field.label.toLowerCase()}>
              <FormLabel>{field.label}</FormLabel>
              <Input 
                className="input-fields"
                type={field.type}
                onChange={handleInputChange}
                />
            </FormControl>
          )
        })
      }
      <Stack spacing={6}>
        <Button 
          colorScheme={'blue'} 
          variant={'solid'} 
          onClick={handleContinuarButton}>
          Continuar
        </Button>
        <Button 
          colorScheme={'gray'} 
          variant={"outline"} 
          onClick={() => {navigate(-1)}}>
          Voltar
        </Button>
      </Stack>
    </Stack>
  </Flex>
  )
}