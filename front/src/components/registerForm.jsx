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
  Box,
  Radio,
  RadioGroup
} from '@chakra-ui/react';
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProviderForm from './providerForm';

const registerFormFields = [
  {
    label: "Nome",
    type: "text"
  },
  {
    label: "CPF",
    type: "text"
  },
  {
    label: "Email",
    type: "email"
  },
  {
    label: "Senha",
    type: "password"
  },
  {
    label: "Confirmar senha",
    type: "password"
  }
]

export default function RegisterForm() {
  const [showGeneralForm, setShowGeneralForm] = useState(true);

  const handleContinuarButton = () => {
    let arr = [...document.getElementsByClassName("input-fields")];
    console.log("1212")
    arr.every(element => {
      if (!element.value) {
        alert("Preencha todos os campos para continuar");
        return false;
      } else if (element.value && document.getElementById("checkbox-provider").checked){
        setShowGeneralForm(false)
        return true;
      }
    });
  }

  const handleVoltarButton = () => {
    setShowGeneralForm(true)
  }

  return (
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      {showGeneralForm ? (
        <GeneralRegisterForm onClick={handleContinuarButton}/>
      ) : (
        <ProviderForm onClick={handleVoltarButton} />
      )}  
    </Flex>
  )
}


function GeneralRegisterForm({ onClick }) {
  const navigate = useNavigate();
  return (
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Stack spacing={4} w={'full'} maxW={'md'}>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Image w={{base: 12, lg: 16}} src={logo} />
        </Box>
        <Text mt={-4} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.400'}>Preencha com seus dados</Text>
        {registerFormFields.map((field) => {
          return(
            <FormControl isRequired 
              key={field.label.toLowerCase()} 
              id={field.label.toLowerCase()}
            >
              <FormLabel>{field.label}</FormLabel>
              <Input className="input-fields" type={field.type} />
            </FormControl>
          )
        })}
        <Stack spacing={6}>
          <Stack
            direction={{ base: 'column'}}
            align={'start'}
            justify={'space-between'}>
            <Text>Desejo:</Text>
            {/* TODO: Change checkbox for radio */}
            <Checkbox id="checkbox-client">Agendar serviços</Checkbox>
            <Checkbox id="checkbox-provider">Prestar serviços</Checkbox>
          </Stack>
          <Button colorScheme={'blue'} variant={'solid'} onClick={onClick}>
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