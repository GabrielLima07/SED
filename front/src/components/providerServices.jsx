import {
  Flex,
  Button,
  Text,
  IconButton,
  Heading,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody
}
from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAuth } from "../context/authContext";
import { getUserData, putServiceDisponibility, deleteService , patchService, postService } from "../services/api";


const AddServiceButton = ({ onAddService}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newService, setNewService] = useState({ nome: '', preco: '' });
  const { userEmail } = useAuth();

  const handleSave = async () => {
    if (newService.nome && newService.preco) {
      const data = {
        prestadorDeServico: await getUserData(`prestador-de-servico/${userEmail}`),
        nome: newService.nome,
        descricao: "",
        preco: newService.preco,
        duracao: 60,
        disponibilidade : true
      }
      await postService(userEmail, data);

      onAddService(newService);
      setNewService({ nome: '', preco: '' });
      onClose();
    } else {
      console.error('Por favor, preencha todos os campos.');
    }
  };

  return (
    <>
      <Button colorScheme="blue" mb={2} onClick={onOpen}>Adicionar Serviço</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Serviço</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome do Serviço</FormLabel>
              <Input
                value={newService.nome}
                type="text"
                onChange={(e) => setNewService({ ...newService, nome: e.target.value })}
              />

              <FormLabel>Preço do Serviço</FormLabel>
              <Input
                value={newService.preco}
                type="text"
                onChange={(e) => setNewService({ ...newService, preco: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme='blue' onClick={handleSave}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};


const ServiceItem = ({ service, onDelete, onUpdate, onChangeDisponibility}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedServiceData, setEditedServiceData] = useState({ nome: service.nome, preco: service.preco, ...service });


  const handleEdit = () => {
    setEditedServiceData({ ...service });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    console.log(editedServiceData)
    try {
      await patchService(editedServiceData.id, editedServiceData);
      onUpdate(editedServiceData);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar as alterações no serviço:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(service.id);
  };

  const handleDisponibility = () => {
    onChangeDisponibility(service.id)
  };

  return (
    <Flex key={service.id} mb={2} borderRadius={4} position="relative"
      border={service.disponibilidade ? "1px solid #547FFF" : "1px solid #FF3737"}
      backgroundColor={service.disponibilidade ? "none" : '#FF3737'}
    >
      <Flex flexDir={"column"} fontWeight={"semibold"}>
        {isEditing ? (
          <>
            <Input
              value={editedServiceData.nome}
              type="text"
              onChange={(e) => setEditedServiceData({ ...editedServiceData, nome: e.target.value })}
            />
            <Input
              value={editedServiceData.preco}
              type="text"
              onChange={(e) => setEditedServiceData({ ...editedServiceData, preco: e.target.value })}
            />
            <Button colorScheme="blue" size="sm" onClick={handleSaveEdit}>Salvar</Button>
            <Button colorScheme="gray" size="sm" onClick={handleCancelEdit}>Cancelar</Button>
          </>
        ) : (
          <>
            <Text m={2} mb={-2}>
              {service.nome}
            </Text>
            <Text m={2}>
              R${service.preco},00
            </Text>
            <Popover>
              <PopoverTrigger>
              <IconButton
                  position="absolute"
                  top={0}
                  right={0}
                  size={"sm"}
                  aria-label="Dropdown-menu"
                  icon={<ChevronDownIcon />}
                  bg="transparent"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Opções</PopoverHeader>
                <PopoverBody>
                  <Button mr={2} size="sm" leftIcon={<EditIcon />} onClick={handleEdit}>Editar</Button>
                  <Button mr={2} size="sm" colorScheme="red" leftIcon={<DeleteIcon />} onClick={handleDelete}>Excluir</Button>
                  <Button mt={2} display={'block'} size="sm" onClick={handleDisponibility}>Marcar como {service.disponibilidade ? "indisponivel" : "disponivel"}</Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default function ProviderServices() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userEmail } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [serviceList, setServiceList] = useState(userData);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getUserData(`servicos/${userEmail}`);
        setUserData(result);
        setServiceList(result)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

    fetchDataFromApi();
  }, [userEmail]);


  const handleAddService = (newService) => {
    setServiceList((prevServices) => [
      ...prevServices,
      { id: prevServices.length, ...newService },
    ]);
    onClose();
  };

  const handleUpdateService = (updatedServiceData) => {
    setServiceList((prevServices) =>
      prevServices.map((service) =>
        service.id === updatedServiceData.id ? updatedServiceData : service
      )
    );
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteService(`servicos/${id}`);
      setServiceList((prevServices) => prevServices.filter((service) => service.id !== id));
    } catch (error) {
      console.error('Erro ao excluir o serviço:', error);
    }
  };

  const handleUpdateServiceDisponibility = async (id) => {
    try {
      await putServiceDisponibility(`servicos/${id}`);
      setServiceList((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? { ...service, disponibilidade: !service.disponibilidade } : service
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar a disponibilidade do serviço:', error);
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Flex
      flexDir={"column"}
      vw={{ base: "100%", md: 0 }}
      w={{ base: "100%", md: "100%" }}
      mr={{ base: 6, md: 6 }}
      ml={{ base: 6, lg: 0}}
      my={{ base: 4, md: 0 }}
    >
      <Heading size="md" mb={2}>
        Meus serviços
      </Heading>
      <Flex flexDir={"column"} border={"1px solid #DADDE2"} borderRadius={4} p={2}>
        <AddServiceButton onAddService={handleAddService}/>
        {serviceList.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            onUpdate={handleUpdateService}
            onDelete={handleDeleteService}
            onChangeDisponibility={handleUpdateServiceDisponibility}
          />
        ))}
      </Flex>
    </Flex>
  );
}