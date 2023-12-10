import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

export default function Notifications(){
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
            aria-label="Notifications"
            icon={<BellIcon />}
            bg="transparent"
            _hover={{
                transform: "scale(1.2)"
            }}
          />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Notificações</PopoverHeader>
        <PopoverBody>
          <Text>Essa funcionalidade ainda será implementada 😉😉🙂</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};