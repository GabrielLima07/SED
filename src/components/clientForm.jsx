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
    Checkbox,
    SimpleGrid
  } from '@chakra-ui/react';
  import logo from "../assets/logo.png";
  import { useState } from 'react';
  import { clientFormData } from "../data/formsFields"
  import { useNavigate } from 'react-router-dom';
  
  export default function ClientForm() {
    const navigate = useNavigate();
    // armazena o contato
    const [formData, setFormData] = useState({});
    // armazena as tags
    const [selectedTags, setSelectedTags] = useState([]);
  
  
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


    const handleCheckboxChange = (tag) => {
      //Verifica se a tag já está ta no array
      if (selectedTags.includes(tag)) {
        // se selecionada, remove
        setSelectedTags(prevSelectedTags => 
          prevSelectedTags.filter(selectedTag => selectedTag !== tag)
        );
      } else {
        // se não selecionada, adiciona
        setSelectedTags(prevSelectedTags => [...prevSelectedTags, tag]);
      }
    }


    const handleContinuarButton = () => {
      // redireciona p/ próxima página se todos os campos foram preenchidos
      if (checkInputFieldsValues()) {
        navigate("/")
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
        <FormControl isRequired id={clientFormData.field.label.toLowerCase()}>
          <FormLabel>{clientFormData.field.label}</FormLabel>
          <Input 
            className="input-fields"
            type={clientFormData.field.type}
            onChange={handleInputChange}/>
        </FormControl>
        <Text fontWeight={"semibold"}>Selecione suas preferências:</Text>
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
        </SimpleGrid>
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