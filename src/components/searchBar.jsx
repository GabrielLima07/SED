import React from 'react';
import { Input, IconButton, InputGroup, InputRightElement, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar() {
  return (
    <Box py={2}>
      <InputGroup size="md" my={-4} 
        w={{base: 236, lg: 400}}
        >
        <Input
          placeholder="Pesquisar..."
          _focus={{ borderColor: "blue.500" }}
        />
        <InputRightElement width="3rem">
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            bg="transparent"
            _hover={{
              transform: "scale(1.2)"
          }}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

export default SearchBar;
