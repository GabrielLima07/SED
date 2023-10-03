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
import { providerFormFields } from "../data/formsFields"
import { useNavigate, useParams } from 'react-router-dom';

export default function ProviderForm() {
  const { page } = useParams()
  const navigate = useNavigate();

  const handleContinuarButton = () => {

    navigate(`/register/provider-form/${parseInt(page) + 1}`)
  }

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
            <FormControl id={field.label.toLowerCase()}>
              <FormLabel>{field.label}</FormLabel>
              <Input type={field.type} />
            </FormControl>
          )
        })
      }
      <Stack spacing={6}>
        <Button 
          colorScheme={'blue'} 
          variant={'solid'} 
          onClick={() => {handleContinuarButton()}}>
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