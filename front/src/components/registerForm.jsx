import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Image,
  Box,
  Radio,
  RadioGroup
} from '@chakra-ui/react';
import logo from "../assets/logo.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerFormFields } from '../data/formsFields';
import SwitchColorMode from './switchColorMode';


export default function RegisterForm() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
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
    // redireciona p/ próxima página se todos os campos foram preenchidos (incluindo o radio)
    if (checkInputFieldsValues() && (value != "")) {
      value === "c" 
      ? navigate(`/register/client-form/`, { state: formData }) 
      : navigate(`/register/provider-form/`, { state: formData })
    } else {
      alert("Preencha todos os campos do formulário para prosseguir")
    }
  };


  const handleInputChange = (event) => {
    // armazena os dados inseridos nos inputs em um objeto
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Stack spacing={4} w={'full'} maxW={'md'}>
        <Flex>
          <SwitchColorMode />
          <Image w={{base: 12, lg: 16}} src={logo} ml='auto' />
        </Flex>
        <Text mt={-4} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.400'}>Preencha com seus dados</Text>
        {registerFormFields.map((field) => {
          return(
            <FormControl isRequired 
              key={field.label.toLowerCase()} 
              id={field.label.toLowerCase()}>
              <FormLabel>{field.label}</FormLabel>
              <Input 
                className="input-fields" 
                type={field.type} 
                onChange={handleInputChange}/>
            </FormControl>
          )})}
        <Stack spacing={6}>
          <Stack
            direction={{ base: 'column'}}
            align={'start'}
            justify={'space-between'}>
            <Text>Desejo:</Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack>
                <Radio value="c" id="radio-client">Agendar serviços</Radio>
                <Radio value="p" id="radio-provider">Prestar serviços</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
          <Button colorScheme={'blue'} variant={'solid'} onClick={handleContinuarButton}>
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