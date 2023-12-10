import React from 'react'
import {
  Flex,
  Text,
  Box,
  Heading, 
  Radio, 
  RadioGroup, 
  VStack,
  Button
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { 
  getUserData, 
  postAppointment, 
  putHorarioFalse, 
  getAgendaId, 
  getTimeByAgendaIdAndDate ,
  getHorarioIdByAgendaDateAndTime
} from '../services/api';
import { StarIcon } from '@chakra-ui/icons';
import ProfileNavBar from '../components/profileNavBar';
import { CalendarPanel } from "chakra-dayzed-datepicker";
import { subDays, addDays } from 'date-fns';

const ProviderData = ({ providerData }) => {
  return (
    <Flex
        flexDir="row"
        p={2}
        boxShadow="md"
        >
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
          </Flex>
          <Flex pb={{base: 3}} pt={{base: 2, lg: 0}} pl={{base: 4}} flexDir={"column"}>
           <Text fontWeight="semibold" fontSize={{base: 16, lg: 20}}>{providerData.nome}</Text>
           <Flex>
             <StarIcon />
             <Text color={'gray.400'} fontSize={{base: 12, lg: 14}} ml={1}>{providerData.nota} •</Text>  
             <Text color={'gray.400'} fontSize={{base: 12, lg: 14}} ml={1}>{providerData.tiposDeServicos[0]}</Text>  
           </Flex>
           <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{providerData.celular}</Text>
           <Flex>
             <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{providerData.diasDefuncionamento[0]} - {providerData.diasDefuncionamento[providerData.diasDefuncionamento.length - 1]}</Text>
             <Text color={'gray.400'} fontSize={{base: 12, lg: 14}} ml={1}>{providerData.abertura} - {providerData.fechamento}</Text>
           </Flex>
           <Text color={'gray.400'} fontSize={{base: 12, lg: 14}}>{providerData.endereco}</Text>
       </Flex>

        </Flex>
  )
}

const ProviderServices = ({ providerServicesList, setSelectedService }) => {

  const handleSelectedService = (id) => {
    setSelectedService(id)
  }

  return (
    <Flex flexDir={"column"} fontWeight={"medium"} w={'100%'}
      maxH={'55vh'} overflow={'auto'}
      pl={2}
    >
      <Heading mb={2} size={'md'}>Selecione um serviço:</Heading>
          {providerServicesList.map((service) => {
            if (service.disponibilidade) {
              return (
                <Flex key={service.id} mb={2} borderRadius={4} flexDir={"column"} w={'96%'}
                border={service.disponibilidade ? "1px solid #547FFF" : "1px solid #FF3737"}
                backgroundColor="none"
                _hover={{
                  boxShadow: '0 4px 8px rgba(84, 127, 255, 0.5)', 
                  transform: 'scale(1.02)', 
                  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out'
                }}
                transition="box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out"
                cursor={"pointer"}
                onClick={() => handleSelectedService(service.id)}
              >
                <Text m={2} mb={-2}>
              {service.nome}
            </Text>
            <Text m={2}>
              R${service.preco},00
            </Text>
              </Flex>
              )
            }
          })}
        </Flex>
  )
}

const ProviderAgenda = ({ providerWorkingDays, setSelectedDay }) => {
  const demoDate = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const Month_Names_Short = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  const Weekday_Names_Short = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab',
  ];

  const Weekday_Names = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ]
 
  function formatDate(date) {
    const day = date.date.getDate().toString().padStart(2, '0');
    const month = (date.date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleDateSelect = (date) => {
    const dayOfWeek = Weekday_Names[date.date.getDay()];
    if (providerWorkingDays.includes(dayOfWeek)) {
      setSelectedDate(date);
      setSelectedDay(formatDate(date));
    }
  };

  return (
    <Flex 
      flexDir="column"
    >
      <Heading mb={2} size={'md'}>Selecione um dia:</Heading>
        <CalendarPanel
          dayzedHookProps={{
            showOutsideDays: false,
            onDateSelected: handleDateSelect,
            selected: selectedDate,
            minDate: subDays(demoDate, 1),
            maxDate: addDays(demoDate, 30),
          }}
          configs={{
            dateFormat: 'dd-MM-yyyy',
            monthNames: Month_Names_Short,
            dayNames: Weekday_Names_Short,
            firstDayOfWeek: 0,
          }}
          
        />
     </Flex>
  )
}

const ProviderTimes = ({ currentDateAvailableTimes, setSelectedTime }) => {
  const handleTimeClick = (horario) => {
    setSelectedTime(horario)
  }

  return(
    <Flex flexDir={'column'} w={'100%'} mr={{base: 0, lg: 8}}
    maxH={{base: "100vh", lg:'55vh'}} overflow={'auto'}
    pl={2}
    >
      <Heading mb={2} size={'md'}>Selecione um horário:</Heading>
      {
        currentDateAvailableTimes.sort((a, b) => {
          let splitTime = a.horario.split(":")
          let divider = a.dia.data.split("/");
          const dateA = new Date(divider[2], divider[1] -1, divider[0], splitTime[0], splitTime[1]);;

          splitTime = b.horario.split(":")
          divider = b.dia.data.split("/");
          const dateB = new Date(divider[2], divider[1] -1, divider[0], splitTime[0], splitTime[1]);;

          return dateA - dateB;
        })
        .map((horario) => {
          if (horario.disponibilidade) {
            return (
              <Flex 
                w={'96%'}
                backgroundColor="none"
                _hover={{
                  boxShadow: '0 4px 8px rgba(84, 127, 255, 0.5)', 
                  transform: 'scale(1.02)', 
                  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out'
                }}
                transition="box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out"
                cursor={"pointer"}
                key={horario.id}
                mb={2} 
                border={"1px solid #547FFF"} 
                borderRadius={4} 
                bgColor={"none"}
                onClick={() => handleTimeClick(horario.horario)}
              >
                <Text m={2} fontWeight={"semibold"}>
                  {horario.horario}
                </Text>
              </Flex>
            )  
          }
        })
      }
    </Flex>
  )
}

const ClientViewProviderProfile = () => {
  const [clienteData, setClienteData] = useState({});
  const [providerData, setProviderData] = useState({});
  const [providerServices, setProviderServices] = useState();
  const [providerTimes, setProviderTimes] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDay, setSelectedDay] = useState(formatDate(new Date()));
  const [selectedTime, setSelectedTime] = useState();
  const [loading, setLoading] = useState(true);
  const { userEmail, logado } = useAuth();
  const [formaPagamento, setFormaPagamento] = useState('');
  const [appointment, setAppointment] = useState({});
  

  const handleSelectFormaDePagamento = (value) => {
    setFormaPagamento(value);
  };

  const handleMarcarAgendamentoClick = async () => {
    await postAppointment(appointment)
      .then(
        setSelectedTime(null),
        setFormaPagamento(null),
        setSelectedService(null),
        setSelectedServiceId(null),
        alert("Agendamento marcado com sucesso!"));
    let agenda_id = await getAgendaId(window.location.pathname.split('/prestador/')[1])
    let horario_id = await getHorarioIdByAgendaDateAndTime(agenda_id, appointment.data.replace(/\//g, "-"), appointment.horario)
    await putHorarioFalse(horario_id)
    fetchDataFromApi(selectedDay);
  }

  useEffect(() => {
    const updatedAppointment = {
      data: selectedDay.replace(/-/g, "/"),
      horario: selectedTime,
      cliente: clienteData,
      prestadorDeServico: providerData,
      servico: selectedService,
      formaDePagamento: formaPagamento,
    };
    setAppointment(updatedAppointment);
  }, [selectedDay, selectedTime, selectedService, formaPagamento]);

  const fetchDataFromApi = async (day) => {
    try {
      const emailFromUrl = window.location.pathname.split('/prestador/')[1];

      const result = await getUserData(`prestador-de-servico/${emailFromUrl}`);
      setProviderData(result);

      const services = await getUserData(`servicos/${emailFromUrl}`);
      setProviderServices(services);
      
      const agenda_id = await getAgendaId(emailFromUrl)
      const horarios = await getTimeByAgendaIdAndDate(agenda_id, day)
      setProviderTimes(horarios);

      const cliente = await getUserData(`clientes/${userEmail}`);
      setClienteData(cliente)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi(selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    const service = providerServices?.find((service) => service.id === selectedServiceId);
    setSelectedService(service);
  }, [selectedServiceId, providerServices]);

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Box>
      <ProfileNavBar />
      <Flex flexWrap={"wrap"} justifyContent="space-between" p={4}>

        {/* provider data */}
        <Box w={{ base: '100%', lg: '30%' }}>
          <ProviderData providerData={providerData} />
        </Box>

        {/* appointment info and payment method */}
        <Box w={{ base: '100%', lg: '68%' }}>
          <Flex flexDir={{base: "column", lg: "row"}}>
            {/* appointment info */}
          <Flex pos={'relative'} w={{ base: '100%', lg: '48%' }} boxShadow="md" p={2} mr={{base: 0, lg: 8}} flexDir={"column"} mt={{base: 4, lg: 0}}>
            {selectedService && (
              <Flex flexDir={"column"}>
                <Text fontSize={{ base: 16}}>
                  Serviço: {selectedService.nome}
                </Text>
                <Text fontSize={{ base: 16 }}>
                  Valor: R${selectedService.preco},00
                </Text>
              </Flex>
            )}
            {selectedDay && (
              <Flex flexDir={"column"}>
                <Text fontSize={{ base: 16}}>
                  Dia: {selectedDay.replace(/-/g, "/")}
                </Text>
            </Flex>
            )}
            {selectedTime && (
              <Flex flexDir={"column"}>
                <Text fontSize={{ base: 16}}>
                  Horário {selectedTime}
                </Text>
            </Flex>
            )}
            {formaPagamento && (
              <Flex flexDir={"column"}>
                <Text fontSize={{ base: 16}}>
                  Forma de pagamento: {formaPagamento}
                </Text>
            </Flex>
            )}
            <Button  
              pos={'absolute'}
              top={2}
              right={2} 
              size={'sm'} 
              colorScheme='blue' 
              onClick={handleMarcarAgendamentoClick}>Marcar agendamento
            </Button>
          </Flex>
          {/* payment method */}
          <Flex w={{ base: '100%', lg: '50%' }} flexDir={"column"} mt={{base: 4, lg: 0}}>
          <Heading mb={2} size={'md'}>Selecione uma forma de pagamento:</Heading>
            <RadioGroup onChange={handleSelectFormaDePagamento} value={formaPagamento}>
              <VStack spacing={1.5} align="start">
                <Radio value="Espécie">Dinheiro (Espécie)</Radio>
                <Radio value="PIX">PIX</Radio>
                <Radio value="Cartao de crédito">Cartão de Crédito</Radio>
                <Radio value="Cartao de débito">Cartão de Débito</Radio>
              </VStack>
            </RadioGroup>
          </Flex>
          </Flex>
        </Box>

        {/* provider agenda */}
        <Box w={{ base: '100%', lg: '30%' }} mt={4}>
          <ProviderAgenda setSelectedDay={setSelectedDay} providerWorkingDays={providerData.diasDefuncionamento}/>
        </Box>
        
        {/* provider times and services */}
        <Box w={{ base: '100%', lg: '68%' }}>
          <Flex flexDir={{base: "column", lg: "row"}}>
            <Flex w={{ base: '100%', lg: '50%' }} mt={4}>
              <ProviderTimes currentDateAvailableTimes={providerTimes} setSelectedTime={setSelectedTime}/>
            </Flex>
            <Flex w={{ base: '100%', lg: '50%' }} mt={4}>
              <ProviderServices providerServicesList={providerServices} setSelectedService={setSelectedServiceId}/>
            </Flex>
          </Flex>
        </Box>

      </Flex>
    </Box>
  )
}

export default ClientViewProviderProfile