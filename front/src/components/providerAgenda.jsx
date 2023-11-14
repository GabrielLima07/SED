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
import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";

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


function DayTimes({ day }) {
  return(
    <SimpleGrid mt={4} mx={2}>
      {day.map((time) => {
        return(
          <Flex 
          mb={2} 
          border={time.available ? "1px solid #547FFF" : "none"} 
          borderRadius={4} 
          bgColor={time.available ? "none" : "#FF3737"}
          
          >
            <Text
              m={2}
              fontWeight={"semibold"}
            >{time.time}</Text>
            <Flex ml="auto">
              <IconButton
                size={"sm"}
                aria-label="Dropdown-menu"
                icon={<ExternalLinkIcon />}
                bg="transparent"
              />
              <IconButton
                size={"sm"}
                aria-label="Dropdown-menu"
                icon={<ChevronDownIcon />}
                bg="transparent"
              />
            </Flex>
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
    <Flex 
      flexDir={"column"} 
      vw={{base: "100%", md:0}}
      w={{base: "100%", md:"100%"}}
      mr={{base: 6, md: 4}}
      ml={{base: 6, lg: 0}}
    >
      <Heading size="md" mb={2}>
        Agenda          
      </Heading>
      <Flex flexDir={"column"} border={"1px solid #DADDE2"} borderRadius={4}>
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
        <DayTimes day={day}/>
      </Flex>
    </Flex>
  )
}