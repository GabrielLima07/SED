import {
  Flex, 
  SimpleGrid, 
  Text,
  IconButton,
  Heading
}
from "@chakra-ui/react";
import { CalendarPanel } from "chakra-dayzed-datepicker";
import { subDays, addDays } from 'date-fns';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

const day = [
  {
    time: "09:00 - 10:00",
    available: false,
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


function DayTimes({ day }) {
  return(
    <SimpleGrid mt={4}>
      {day.map((time) => {
        return(
          <Flex mb={2} border={"1px solid #AADDE2"} borderRadius={4}>
            <Text
              m={2}
            >{time.time}</Text>
            <IconButton
              ml={"auto"}
              size={"sm"}
              aria-label="Dropdown-menu"
              icon={<ChevronDownIcon />}
              bg="transparent"
            />
          </Flex>
        )
      })}
    </SimpleGrid>
  )
}


export default function ProviderAgenda() {
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

  const handleDateSelect = (date) => {
    setDate(date);
  };



  return(
    <Flex flexDir={"column"}>
      <Heading size="md" mb={2}>
        Agenda          
      </Heading>
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
      <DayTimes day={day} />
    </Flex>
  )
}