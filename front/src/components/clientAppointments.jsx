import {
  Flex,
  Text,
  Heading,
  Image,
  IconButton,
  SimpleGrid,
  Tag,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Button, 
  Portal,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormControl,
  FormLabel,
  Select
} from '@chakra-ui/react'
import { CalendarIcon, TimeIcon, TriangleDownIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useAuth } from '../context/authContext';
import { getClientAppointments, cancelAppointment, getAgendaId, getHorarioIdByAgendaDateAndTime, putAlternateHorarioDisponibility } from '../services/api';
import serv from "../assets/22213018880.png";
import { isAfter} from 'date-fns';


function EditAppointmentDetails({ appointment }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState(appointment);
  const [selectedDay, setSelectedDay] = useState(appointment.date);
  const [selectedTime, setSelectedTime] = useState(appointment.time);

  const diasDisponiveis = [
    {
        date: appointment.date,
        times: [
            "09:00 - 10:00",
            "10:00 - 11:00",
        ]
    },
    {
        date: "30/11",
        times: [
            "14:00 - 15:00",
            "15:00 - 16:00",
        ]
    },
    {
        date: "01/12",
        times: [
            "12:00 - 13:00",
            "16:00 - 17:00",
        ]
    }
  ]

  const handleOpenModal = () => {
    setSelectedDay('');
    setSelectedTime('');
    setFormData(appointment);
    onOpen();
  };

  const handleChangeDay = (event) => {
    const selectedDay = event.target.value;
    setSelectedDay(selectedDay);

    setFormData((prevData) => ({
      ...prevData,
      date: selectedDay, // Atualiza date em formData
    }));
  };

  const handleChangeTime = (event) => {
    const selectedTime = event.target.value;
    setSelectedTime(selectedTime);

    setFormData((prevData) => ({
      ...prevData,
      time: selectedTime, // Atualiza time em formData
    }));
  };

  const handleSave = () => {
    setFormData(appointment);
    console.log(formData)
    onClose();
  };

  return (
    <>
      <Button mt={2} display={'block'} size="sm" onClick={onOpen}>Alterar detalhes do agendamento</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do agendamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
            <FormLabel>Dias disponíveis</FormLabel>
            <Select value={selectedDay} onChange={handleChangeDay}>
              {diasDisponiveis.map((dia) => (
                <option key={dia.date} value={dia.date}>
                  {dia.date}
                </option>
              ))}
            </Select>

            <FormLabel>Horários disponíveis</FormLabel>
            <Select value={selectedTime} onChange={handleChangeTime}>
              {diasDisponiveis
                .find((dia) => dia.date === selectedDay)
                ?.times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
            </Select>
              
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

function Appointment({ appointment, onUpdate, onUpdateAppointments }) {
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

    const handleDelete = (id) => {
        onDelete(id)
    }

    const handleUpdate = (id) => {
        onUpdate(id)
    }

    return (
        <Flex border={"1px solid #DADDE2"} borderRadius={4}>
            <Image src={serv} w={36} />
            <Flex flexDir={"column"} ml={3} mt={2}>
                <Text color={'gray.500'} fontSize={{base: 12, lg: 14}}>{appointment.prestadorDeServico.nome}</Text>
                <Text fontWeight="semibold" fontSize={{base: 14, lg: 16}}>{appointment.servico.nome}</Text>
                <Flex my={1}>
                    <CalendarIcon />
                    <Text mt={-0.5} ml={1} color={'gray.500'} fontSize={{base: 12, lg: 14}}>{appointment.data}</Text>
                </Flex>
                <Flex my={1}>
                    <TimeIcon />
                    <Text mt={-0.5} ml={1} color={'gray.500'} fontSize={{base: 12, lg: 14}}>{appointment.horario}</Text>
                </Flex>
                <Flex my={1}>
                    <TriangleDownIcon />
                    <Text mt={-0.5} ml={1} color={'gray.500'}fontSize={{base: 12, lg: 14}}>{appointment.prestadorDeServico.endereco}</Text>
                </Flex>
            </Flex>
            <Flex 
              ml="auto" 
              h={7} 
              my={2} 
              flexDir={{base: "row",md:"row"}}
              mt={{base: 2, md: 0}}
            >
                <Tag 
                  py={2} 
                  px={4} 
                  mt={{base: 1, md: 2}}
                  bgColor={"blue.300"}
                >
                  R${appointment.servico.preco},00
                </Tag>
                
                <Popover>
                    <PopoverTrigger>
                        <IconButton
                          size={"sm"}
                          aria-label="Dropdown-menu"
                          icon={<ChevronDownIcon />}
                          bg="transparent"
                        />
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Opções</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Button mr={2} size="sm" colorScheme="red" onClick={() => handleCancel(appointment.id)}>Cancelar agendamento</Button>
                          {/* <EditAppointmentDetails appointment={appointment} /> */}
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                </Popover>
            </Flex>
        </Flex>
    )
}

export default function ClientAppointments() {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userEmail } = useAuth();

  useEffect(() => {
    fetchDataFromApi();
  }, [userEmail]);

  const fetchDataFromApi = async () => {
    try {
      const result = await getClientAppointments(userEmail);
      setAppointmentsData(result);

      const today = new Date();

      const past = result.filter((appointment) => {
        let splitTime = appointment.horario.split(":")
        let divider = appointment.data.split("/");
        let dateToBeCompared = new Date(divider[2], divider[1] -1, divider[0], splitTime[0], splitTime[1]);
        return isAfter(dateToBeCompared, today) ? false : true
      });

      const future = result.filter((appointment) => {
        let splitTime = appointment.horario.split(":")
        let divider = appointment.data.split("/");
        let dateToBeCompared = new Date(divider[2], divider[1] -1, divider[0], splitTime[0], splitTime[1]);
        return isAfter(dateToBeCompared, today) ? true : false
      });

      setPastAppointments(past);
      setFutureAppointments(future);
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

  return (
    <Flex mb={4} mx={6} flexDir={{base: "column", lg: "row"}} gap={4}>

      {/* Futuros */}
      <Flex flexDir={'column'} w={{base: "100%", lg:"50%"}}>
        <Heading size="md" mb={2}>
          Agendamentos
        </Heading>
        <Flex flexDir="column">
          <SimpleGrid p={0} spacing={2} borderRadius={4} maxH={{base: "100vh", lg: "50vh"}} overflow="auto">
            {futureAppointments
              .sort((a, b) => {
                let splitTime = a.horario.split(":")
                let divider = a.data.split("/");
                const dateA = new Date(divider[2], divider[1] -1, divider[0], splitTime[0], splitTime[1]);;

                splitTime = b.horario.split(":")
                divider = b.data.split("/");
                const dateB = new Date(divider[2], divider[1] -1, divider[0], splitTime[0], splitTime[1]);;

                return dateA - dateB;
              })
              .map((appointment) => (
                <Appointment
                  key={appointment.id}
                  appointment={appointment}
                  onUpdateAppointments={handleUpdateAppointments}
                />
              ))}
          </SimpleGrid>
        </Flex>
      </Flex>

      {/* Anteriores */}
      <Flex flexDir={'column'} w={{base: "100%", lg:"50%"}}>
        <Heading size="md" mb={2}>
          Agendamentos anteriores
        </Heading>
        <SimpleGrid p={0} spacing={2} borderRadius={4} maxH={{base: "100vh", lg: "50vh"}} overflow="auto">
          {pastAppointments
            .sort((a, b) => {
              let splitTime = a.horario.split(":")
              let divider = a.data.split("/");
              const dateA = new Date(divider[2], divider[1] -1, divider[0], splitTime[0], splitTime[1]);;

              splitTime = b.horario.split(":")
              divider = b.data.split("/");
              const dateB = new Date(divider[2], divider[1] -1, divider[0], splitTime[0], splitTime[1]);;

              return dateA - dateB;
            })
            .map((appointment) => (
              <Appointment
                key={appointment.id}
                appointment={appointment}
                onUpdateAppointments={handleUpdateAppointments}
              />
            ))}
        </SimpleGrid>
      </Flex>

    </Flex>
    
  );
}