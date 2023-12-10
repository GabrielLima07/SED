import {
  Flex,
  Text,
  IconButton,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'
import { EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Notifications from './notifications';
import { getUserData, putUserData } from '../services/api';
import { useAuth } from '../context/authContext';


function EditUserData({ userData, setUserData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(userData);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const result = await putUserData('clientes', formData);
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
        mt={{ base: 2, lg: 0 }}
        aria-label="Edit"
        icon={<EditIcon />}
        bg="transparent"
        _hover={{
          transform: 'scale(1.2)',
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

              <FormLabel>Telefone</FormLabel>
              <Input onChange={(e) => handleChange('celular', e.target.value)} value={formData.celular}  type='tel'/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default function ClientProfileData() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { loggedUserData, logado, logout, userEmail } = useAuth();

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getUserData(`clientes/${userEmail}`);
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
        <Flex m={8}>
            <Flex
              bg="blue.100"
              w={{base: 28, lg: 120}}  
              h={{base: 28, lg: 120}}
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              border="1px solid"
              borderColor="black"
              fontSize={{base: 24, lg: 28}}
              fontWeight="semibold"
              color="blue.400"
            >
                {/*add profile pic */}
                <Text>{userData.nome[0]}</Text>
            </Flex>
            <Flex pb={{base: 3}} pt={{base: 4, lg: 2}} pl={{base: 4}} flexDir={"column"}>
                <Text fontWeight="semibold" fontSize={{base: 16, lg: 20}}>{userData.nome}</Text>
                <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{userData.email}</Text>
                <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{userData.celular}</Text>
                <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{userData.endereco}</Text>
            </Flex>
            <Flex flexDir={"column"} pt={0.5} ml={"auto"}>
                <EditUserData userData={userData} setUserData={setUserData} />
                <Notifications />
            </Flex>
        </Flex>
    )
}