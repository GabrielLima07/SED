import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import ProviderSearchCard from "./providerSearchCard";
import { useNavigate } from "react-router-dom";
import { getProviders } from "../services/api";
import { useState, useEffect } from "react";
import { useAuth } from '../context/authContext';


export default function SearchResults({ searchQuery: propSearchQuery }) {
  const [providers, setProviders] = useState([]);
  const { userEmail } = useAuth();

  useEffect(() => {
    const getResults = async () => {
      try {
        const result = await getProviders();
        setProviders(result);
      } catch (error) {
        console.log(error)
      } 
    }

    getResults()
    
  }, []);


  const location = useLocation();
  const queryFromUrl = new URLSearchParams(location.search).get("query");
  const searchQuery = propSearchQuery || queryFromUrl;
  const navigate = useNavigate(); 

  const handleCardClick = (id) => {
    navigate(`/prestador/${id}`)
  }

  const filteredResults = providers.filter((result) =>
  result.tiposDeServicos.some((tipo) =>
    tipo.toLowerCase().includes(searchQuery.toLowerCase())
  )
);

  return (
    <Flex flexDir={"column"} m={4}>
      <Heading size={"md"}>Resultados da pesquisa para: {searchQuery}</Heading>
  
      {filteredResults.length === 0 ? (
        <Text>Nenhum resultado encontrado.</Text>
      ) : (
        <SimpleGrid m={4} minChildWidth={'400px'} spacing='40px'>
          {filteredResults.map((result) => (
            <ProviderSearchCard key={result.email} provider={result} onClick={() => handleCardClick(result.email)} />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
}
