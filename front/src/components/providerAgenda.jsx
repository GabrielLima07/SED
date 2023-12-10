import {
  Flex, 
  SimpleGrid, 
  Text,
  IconButton,
  Heading,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Button, 
  Portal,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton
}
from "@chakra-ui/react";
import { CalendarPanel } from "chakra-dayzed-datepicker";
import { subDays, addDays } from 'date-fns';
import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { getAgendaId, getTimeByAgendaIdAndDate, putAlternateHorarioDisponibility, deleteTime } from "../services/api";
import { useAuth } from '../context/authContext';

const day = [
  {
    time: "09:00 - 10:00",
    available: true,
  },
  {
    time: "10:00 - 11:00",
    available: false,
  },
  {
    time: "11:00 - 12:00",
    available: false,
  },
  {
    time: "12:00 - 13:00",
    available: true,
  },
  {
    time: "13:00 - 14:00",
    available: true,
  },
  {
    time: "14:00 - 15:00",
    available: true,
  },
  {
    time: "15:00 - 16:00",
    available: true,
  },
  {
    time: "16:00 - 17:00",
    available: true,
  }
]


function TimeSlot({ time, onDelete, onUpdate }){

  const handleDelete = (id) =>{
    onDelete(id)
  }

  const handleUpdate = (id) => {
    onUpdate(id)
  }

  return(
    <Flex 
      mb={2} 
      border={time.disponibilidade ? "1px solid #547FFF" : "1px solid #FF3737"} 
      borderRadius={4} 
      bgColor={time.disponibilidade ? "none" : "#FF3737"}
      w={{base: "100%", md: "330px", lg: "100%"}}
    >
      <Text
        m={2}
        fontWeight={"semibold"}
      >{time.horario}</Text>
      <Flex ml="auto">
        <IconButton
          size={"sm"}
          aria-label="Share"
          icon={<ExternalLinkIcon />}
          bg="transparent"
        />
        
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
                <Button mr={2} size="sm" colorScheme="red" onClick={() => handleDelete(time.id)}>Remover horário</Button>
                <Button mt={2} display={'block'} size="sm" onClick={() => handleUpdate(time.id)}>Marcar como {time.disponibilidade ? "indisponivel" : "disponivel"}</Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Flex>
    </Flex>
  )
}


export default function ProviderAgenda() {
  const [timeList, setTimeList] = useState(day)
  const demoDate = new Date();
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
  const [date, setDate] = useState(new Date());
  const [providerTimes, setProviderTimes] = useState([]);
  const { userEmail, logado } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchDataFromApi = async (day) => {
    try {
      const agenda_id = await getAgendaId(userEmail)
      const horarios = await getTimeByAgendaIdAndDate(agenda_id, formatDate(day))
      setProviderTimes(horarios.sort((a, b) => getMinutesFromTime(a.horario) - getMinutesFromTime(b.horario)));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi(date);
  }, [date]);

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const getMinutesFromTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };

  const handleDeleteTime = async (id) => {
    await deleteTime(id);
    fetchDataFromApi(date);
  }

  const handleUpdateTime = async (id) => {
    await putAlternateHorarioDisponibility(id);
    fetchDataFromApi(date);
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return(
    <Flex 
      flexDir={"column"} 
      mr={{base: 6, md: 4}}
      ml={{base: 6, lg: 0}}
      mb={5}
    >
      <Heading size="md" mb={2}>
        Agenda          
      </Heading>
      <Flex flexDir={"column"} maxH={{base:'100vh', lg:'50vh'}} overflow={'auto'}
      >
          <CalendarPanel
            dayzedHookProps={{
              showOutsideDays: true,
              onDateSelected: handleDateSelect,
              selected: date,
              minDate: subDays(demoDate, 1),
              maxDate: addDays(demoDate, 30),
            }}
            configs={{
              dateFormat: 'yyyy-MM-dd',
              monthNames: Month_Names_Short,
              dayNames: Weekday_Names_Short,
              firstDayOfWeek: 0,
            }}
          />

        <SimpleGrid mt={4} mr={2}>
          {providerTimes.map((time) => {
            return(
              <TimeSlot 
                key={time.id}
                time={time} 
                onDelete={handleDeleteTime}
                onUpdate={handleUpdateTime}
              />
            )
          })}
        </SimpleGrid>

      </Flex>
    </Flex>
  )
}