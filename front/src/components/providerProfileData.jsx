import {
  Flex,
  Text,
  IconButton,
  Image, 
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { EditIcon, BellIcon, StarIcon } from "@chakra-ui/icons";
import { useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Notifications from './notifications';
import { useAuth } from '../context/authContext';
import { getProviderUserData, putProviderUserData } from '../services/api';


function EditUserData({ userData, setUserData }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState(userData);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleChangeWorkingDay = (index, value) => {
    setFormData((prevData) => {
      const newWorkingDays = [...prevData.workingDays];
      newWorkingDays[index] = value;

      return {
        ...prevData,
        workingDays: newWorkingDays,
      };
    });
  };

  const handleSave = async () => {
    try {
      const result = await putProviderUserData('clientes', formData);
      setUserData(result); 
      onClose();
    } catch (error) {
      console.log('Erro ao salvar os dados:', error);
    }
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        mt={{base: 2, lg: 0}}
        aria-label="Edit"
        icon={<EditIcon />}
        bg="transparent"
        _hover={{
          transform: "scale(1.2)"
          }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Meus dados</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input onChange={(e) => handleChange('nome', e.target.value)} value={formData.nome} type='text' mb={3}/>

              <FormLabel>Segmento</FormLabel>
              <Input onChange={(e) => handleChange('tiposDeServicos', e.target.value)} value={formData.tiposDeServicos} type='text' mb={3}/>

              <FormLabel>Telefone</FormLabel>
              <Input onChange={(e) => handleChange('celular', e.target.value)} value={formData.celular} type='tel' mb={3}/>

              <FormLabel>Dias de funcionamento</FormLabel>
              <Flex gap={4} mb={3}>
                <Input onChange={(e) => handleChangeWorkingDay(0, e.target.value)} value={formData.diasDefuncionamento[0]} type='text' />
                <Input onChange={(e) => handleChangeWorkingDay(1, e.target.value)} value={formData.diasDefuncionamento[formData.diasDefuncionamento.length - 1]} type='text' />
              </Flex>

              {/* <FormLabel>Horários de funcionamento</FormLabel>
              <Flex gap={4} mb={3}>
                <Input onChange={(e) => handleChange('abertura', e.target.value)} value={formData.abertura} type='time' />
                <Input onChange={(e) => handleChange('fechamento', e.target.value)} value={formData.fechamento} type='time' />
              </Flex> */}

              <FormLabel>Endereço</FormLabel>
              <Input onChange={(e) => handleChange('endereco', e.target.value)} value={formData.endereco} type='text' />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme='blue' onClick={handleSave}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default function ProviderProfileData() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedUserData, logado, logout, userEmail } = useAuth();
  const pic = "https://acessecontabilidade.com.br/wp-content/uploads/2023/04/5138237-1024x1024.jpg";

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getProviderUserData(`prestador-de-servico/${userEmail}`);
        setUserData(result);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchDataFromApi();
  }, [userEmail]);


  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Flex mt={6} mx={8}>
      <Flex
        bg="purple.100"
        w={{base: 28, lg: 120}}  
        h={{base: 28, lg: 120}}
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        border="1px solid"
        borderColor="black"
        fontSize={{base: 24, lg: 28}}
        fontWeight="semibold"
        color="purple.400"
      >
          <Image src={pic} maxW="100%"maxH="100%" borderRadius="50%" />
      </Flex>
      <Flex pb={{base: 3}} pt={{base: 2, lg: 0}} pl={{base: 4}} flexDir={"column"}>
          <Text fontWeight="semibold" fontSize={{base: 16, lg: 20}}>{userData.nome}</Text>
          <Flex>
            <StarIcon />
            <Text color={'gray.400'} fontSize={{base: 12, lg: 14}} ml={1}>{userData.nota} •</Text>  
            <Text color={'gray.400'} fontSize={{base: 12, lg: 14}} ml={1}>{userData.tiposDeServicos[0]}</Text>  
          </Flex>
          <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{userData.celular}</Text>
          <Flex>
            <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{userData.diasDefuncionamento[0]} - {userData.diasDefuncionamento[userData.diasDefuncionamento.length - 1]} •</Text>
            <Text color={'gray.400'} fontSize={{base: 12, lg: 14}} ml={1}>{userData.abertura} - {userData .fechamento}</Text>
          </Flex>
          <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{userData.endereco}</Text>
      </Flex>
      <Flex flexDir={"column"} pt={0.5} ml={"auto"}>
          <EditUserData userData={userData} setUserData={setUserData}/>
          <Notifications />
      </Flex>
    </Flex>
  )  
}