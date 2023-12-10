import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Image,
  Checkbox,
  SimpleGrid,
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalCloseButton, 
  useDisclosure
} from '@chakra-ui/react';
import logo from "../assets/logo.png";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import SwitchColorMode from './switchColorMode';
import { postUserData } from '../services/api';

const daysOfWeek = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];


export default function ProviderForm() {
  const { page } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(location.state || {});
  const [selectedDays, setSelectedDays] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Ordena o array de dias selecionados com base no padrão de dias da semana
    const sortedDays = selectedDays.slice().sort((a, b) => {
      return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
    });
    setSelectedDays(sortedDays);
  }, [selectedDays]);

  const handleContinuarButton = async () => {
    if (checkInputFieldsValues()) {
      try {
        formData.tiposDeServicos.shift()
        onOpen();
        const result = await postUserData('prestador-de-servico', {
          ...formData,
          diasDefuncionamento: selectedDays,
          nota: 5
        });
  
        onClose();
  
        navigate(`/userTypeLogin`);
      } catch (error) {
        console.error('Erro ao fazer a requisição POST:', error);
        onClose();
      }
    } else {
      alert('Preencha todos os campos do formulário para prosseguir');
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
  
    if (id.startsWith("especialidade")) {
      const index = parseInt(id.replace("especialidade", ""), 10);
  
      // Verifica se o valor é não vazio antes de adicioná-lo ao array
      if (value.trim() !== "") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          tiposDeServicos: [
            ...(prevFormData.tiposDeServicos || []).slice(0, index),
            value,
            ...(prevFormData.tiposDeServicos || []).slice(index + 1),
          ],
        }));
      } else {
        // Se o valor for vazio, remove o campo do array
        setFormData((prevFormData) => ({
          ...prevFormData,
          tiposDeServicos: (prevFormData.tiposDeServicos || []).filter(
            (_, i) => i !== index
          ),
        }));
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };
  

  const handleCheckboxChange = (day) => {
    // Adiciona ou remove o dia do array de dias selecionados
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const checkInputFieldsValues = () => {
    // Se algum dos campos não estiver preenchido, retorna false
    let arr = [...document.getElementsByClassName("input-fields")];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value === "") {
        return false;
      }
    }
    return true;
  };
  //   // Redireciona para a próxima página se todos os campos foram preenchidos
  //   if (checkInputFieldsValues()) {
  //     navigate(`/register/provider-form/${parseInt(page) + 1}`, {
  //       state: { ...formData, diasFuncionamento },
  //     });
  //   } else {
  //     alert("Preencha todos os campos do formulário para prosseguir");
  //   }
  // };

  // const handleInputChange = (event) => {
  //   // Armazena os dados inseridos nos inputs em um objeto
  //   const { id, value } = event.target;
  //   setFormData({ ...formData, [id]: value });
  // };

  // const handleDiasFuncionamentoChange = (dia) => {
  //   setDiasFuncionamento((prevDiasFuncionamento) => ({
  //     ...prevDiasFuncionamento,
  //     [dia]: !prevDiasFuncionamento[dia],
  //   }));
  // };

  return (
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Stack spacing={4} w={'full'} maxW={'md'}>
        <Flex>
          <SwitchColorMode />
          <Image w={{ base: 12, lg: 16 }} src={logo} ml='auto' />
        </Flex>
        <Text mt={-4} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.400'}>
          Preencha com seus dados
        </Text>
        <FormControl isRequired>
          <FormLabel id="especialidade">Especialidades</FormLabel>
          <Input
            mb={2}
            className="input-fields"
            type="text"
            id="especialidade1" 
            onChange={handleInputChange}
            placeholder='Barbearia'
          />
          <Input
            className="input-fields"
            type="text"
            id="especialidade2"
            onChange={handleInputChange}
            placeholder='Cabelo'
          />

          <FormLabel id="endereco">Endereço</FormLabel>
          <Input
            className="input-fields"
            type="text"
            id="endereco"
            onChange={handleInputChange}
            placeholder='Rua do sol, 51 - São José'
          />

          <FormLabel id="abertura">Abertura</FormLabel>
          <Input
            className="input-fields"
            type="time"
            id="abertura"
            onChange={handleInputChange}
          />

          <FormLabel id="fechamento">Fechamento</FormLabel>
          <Input
            className="input-fields"
            type="time"
            id="fechamento"
            onChange={handleInputChange}
          />

          <FormLabel id="diasDefuncionamento">Dias de funcionamento</FormLabel>
          <SimpleGrid columns={4} gap={2}>
            <Checkbox
              isChecked={selectedDays.includes("Domingo")}
              onChange={() => handleCheckboxChange("Domingo")}
            >
              Domingo
            </Checkbox>
            <Checkbox
              isChecked={selectedDays.includes("Segunda")}
              onChange={() => handleCheckboxChange("Segunda")}
            >
              Segunda
            </Checkbox>
            <Checkbox
              isChecked={selectedDays.includes("Terça")}
              onChange={() => handleCheckboxChange("Terça")}
            >
              Terça
            </Checkbox>
            <Checkbox
              isChecked={selectedDays.includes("Quarta")}
              onChange={() => handleCheckboxChange("Quarta")}
            >
              Quarta
            </Checkbox>
            <Checkbox
              isChecked={selectedDays.includes("Quinta")}
              onChange={() => handleCheckboxChange("Quinta")}
            >
              Quinta
            </Checkbox>
            <Checkbox
              isChecked={selectedDays.includes("Sexta")}
              onChange={() => handleCheckboxChange("Sexta")}
            >
              Sexta
            </Checkbox>
            <Checkbox
              isChecked={selectedDays.includes("Sábado")}
              onChange={() => handleCheckboxChange("Sábado")}
            >
              Sábado
            </Checkbox>
          </SimpleGrid>
        </FormControl>
        <Stack spacing={6}>
          <Button
            colorScheme={'blue'}
            variant={'solid'}
            onClick={handleContinuarButton}
          >
            Continuar
          </Button>
          <Button
            colorScheme={'gray'}
            variant={'outline'}
            onClick={() => {
              navigate(-1);
            }}
          >
            Voltar
          </Button>
        </Stack>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Processando...</ModalHeader>
          <ModalBody>
            Aguarde enquanto o processo está em andamento.
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
