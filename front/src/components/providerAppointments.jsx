import {
  Flex,
  Text,
  Heading,
  Image,
  IconButton,
  SimpleGrid,
  Tag,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
} from '@chakra-ui/react';
import { PhoneIcon, TimeIcon, ChatIcon, NotAllowedIcon } from "@chakra-ui/icons";
import serv from "../assets/22213018880.png";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { getProviderAppointments, cancelAppointment, getAgendaId, getHorarioIdByAgendaDateAndTime, putAlternateHorarioDisponibility } from '../services/api';

let today = new Date();
let pic = serv;

function Appointment({ appointment, onUpdateAppointments }) {
  const handleCancel = async () => {
    try {
      let agenda_id = await getAgendaId(appointment.prestadorDeServico.email)
      let horario_id = await getHorarioIdByAgendaDateAndTime(agenda_id, appointment.data.replace(/\//g, "-"), appointment.horario)
      await cancelAppointment(appointment.id)
      .then(
        putAlternateHorarioDisponibility(horario_id),
        alert("Agendamento cancelado com sucesso!")
      );
      onUpdateAppointments();
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
    }
  };

  return(
    <Flex border={"1px solid #DADDE2"} borderRadius={4}>
      <Flex>
        <Image src={pic} w={{base: 28}}/>
      </Flex>
      <Flex flexDir={"column"} pl={2} mt={1}>
        <Text fontWeight={"semibold"}>{appointment.cliente.nome}</Text>
        <Text fontWeight={"semibold"} fontSize={"sm"} mt={-1}>{appointment.servico.nome}</Text>
        <Flex mt={1} color={'gray.500'}>
          <TimeIcon />
          <Text mt={-0.5} ml={1} fontSize={{base: 12, lg: 12}}>{appointment.horario}</Text>
        </Flex>
        <Flex mt={1} color={'gray.500'}>
          <PhoneIcon />
          <Text mt={-0.5} ml={1} fontSize={{base: 12, lg: 12}}>{appointment.cliente.celular}</Text>
        </Flex>
        <Flex mt={1} color={'gray.500'}>
          <ChatIcon />
          <Text mt={-0.5} ml={1} mb={2} fontSize={{base: 12, lg: 12}}>Envie uma mensagem</Text>
        </Flex>
      </Flex>
      <Flex 
        ml="auto" 
        h={7} 
        my={2} 
        flexDir={{base: "column",md:"row"}}
        mt={{base: 2, md: 0}}
      >
        <Tag 
          mr={{base: "auto", md: 1}}
          py={2} 
          px={4}
          mt={{base: 2, md: 2}}
          bgColor={"green.300"}
        >
          {appointment.formaDePagamento}
        </Tag>
        <Tag 
          mr={{base: 2, md: 0}}
          py={2} 
          px={4} 
          mt={{base: 2, md: 2}}
          bgColor={"blue.300"}
        >
          R${appointment.servico.preco},00
        </Tag>
        <Popover>
          <PopoverTrigger>
            <IconButton
              mt={1}
              size={"sm"}
              aria-label="Dropdown-menu"
              icon={<NotAllowedIcon />}
              bg="transparent"
              _hover={{
                transform: "scale(1.4)"
              }}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Cancelar Agendamento</PopoverHeader>
            <PopoverBody>
              Tem certeza de que deseja cancelar este agendamento?
              <Button colorScheme="red" ml={2} onClick={handleCancel}>
                Sim
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  )
}


export default function ProviderAppointments() {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userEmail } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchDataFromApi();
  }, [userEmail]);

  const fetchDataFromApi = async () => {
    try {
      const result = await getProviderAppointments(userEmail);
      setAppointmentsData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAppointments = () => {
    fetchDataFromApi();
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  function compareDates(dateString) {
    const today = new Date();
    const parts = dateString.split('/');
    const customDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const todayFormatted = formatDate(today);
    const customDateFormatted = formatDate(customDate);
  
    return todayFormatted === customDateFormatted;
  }
  
  function compareTimes(appointmentA, appointmentB) {
    const timeA = appointmentA.horario;
    const timeB = appointmentB.horario;
  
    if (timeA < timeB) {
      return -1;
    } else if (timeA > timeB) {
      return 1;
    } else {
      return 0;
    }
  }


  return (
    <Flex mb={4} mx={6} flexDir={"column"} >
      <Heading size="md" mb={2}>
        Agendamentos {today.getDate().toString().padStart(2, '0') + "/" + (today.getMonth() + 1).toString().padStart(2, '0')}
      </Heading>
      <SimpleGrid pr={2} spacing={2} maxH={{base:'100vh', lg:'52vh'}} overflow={'auto'}>
        { appointmentsData
          .filter((appointment) => compareDates(appointment.data))
          .sort(compareTimes)
          .map((appointment) => (
            <Appointment appointment={appointment} key={appointment.id} onUpdateAppointments={handleUpdateAppointments} />
          ))}
      </SimpleGrid>
    </Flex>
  );
}