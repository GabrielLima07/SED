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
} from '@chakra-ui/react';
import logo from "../assets/logo.png";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postUserData } from '../services/api';
  

export default function ClientForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    genero: '', 
    dataDeNascimento: '', 
    estadoCivil: '',
    preferencias: [], 
    endereco: ""
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const location = useLocation();
  const formDataFromRegisterForm = location.state;


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

  const handleContinuarButton = async () => {
    if(checkInputFieldsValues()) {
      const combinedFormData = {...formDataFromRegisterForm, ...formData};
    try {
      setLoading(true);
      const result = await postUserData("clientes", combinedFormData);
      console.log("Cadastro concluído")
      navigate("/profile", {email : result.email})
      //navigate('/')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    } 
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  
  return (
  <Flex p={8} flex={1} align={'center'} justify={'center'}>
    <Stack spacing={4} w={'full'} maxW={'md'}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Image w={{base: 12, lg: 16}} src={logo} />
      </Box>
      <Text mt={-4} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.400'}>Preencha com seus dados</Text>
      <FormControl isRequired>
        <FormLabel id="dataDeNascimento">Data de nascimento</FormLabel>
        <Input
          className="input-fields"
          type="date"
          id="dataDeNascimento"
          onChange={handleInputChange}
        />

        <FormLabel id="genero">Gênero</FormLabel>
        <Input
          className="input-fields"
          type="text"
          id="genero"
          onChange={handleInputChange}
        />

        <FormLabel id="estadoCivil">Estado civil</FormLabel>
        <Input
          className="input-fields"
          type="text"
          id="estadoCivil"
          onChange={handleInputChange}
        />

        <FormLabel id="endereco">Endereço</FormLabel>
        <Input
          className="input-fields"
          type="text"
          id="endereco"
          onChange={handleInputChange}
        />
      </FormControl>
      {/* <Text fontWeight={"semibold"}>Selecione suas preferências:</Text>
      <SimpleGrid mb={4} columns={2} spacingY={8}>
      { clientFormData.tags.map(tag => {
          return (
            <Checkbox
              key={tag} 
              className="tags"
              onChange={() => handleCheckboxChange(tag)}
              checked={selectedTags.includes(tag)}
              >{tag}</Checkbox>
          )
      })}
      </SimpleGrid> */}
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