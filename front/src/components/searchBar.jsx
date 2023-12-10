import React from 'react';
import { Input, IconButton, InputGroup, InputRightElement, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBar({ setSearchQuery, onSearch }) {
  return (
    <Box py={2}>
      <InputGroup size="md" my={-4} w={{ base: 236, lg: 400 }}>
        <Input
          placeholder="Pesquisar..."
          _focus={{ borderColor: "blue.500" }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputRightElement width="3rem">
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            bg="transparent"
            _hover={{
              transform: "scale(1.2)"
            }}
            onClick={onSearch}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
