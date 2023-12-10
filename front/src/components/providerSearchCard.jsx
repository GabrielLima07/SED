import { StarIcon } from "@chakra-ui/icons"
import { Flex, Heading, Image, Text } from "@chakra-ui/react"


export default function ProviderSearchCard({ provider, onClick }){

  const pic = "https://acessecontabilidade.com.br/wp-content/uploads/2023/04/5138237-1024x1024.jpg";
  
  return(
    <Flex mb={4} border={"1px solid #DADDE2"} borderRightRadius={4} onClick={onClick}
    _hover={{
      transform: 'scale(1.02)', 
      transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out'
    }}
    transition="box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out"
    cursor={"pointer"}
    >
      <Flex>
        <Image w={40} h={40} src={pic} />
      </Flex>
      <Flex flexDir={"column"} mx={4}>
        <Heading size={'sm'} mt={3}>
          {provider.nome}
        </Heading>
        <Flex>
          <StarIcon mt={2} mr={1}/>
          <Text mt={1.5}>{provider.nota}</Text>
        </Flex>
        <Text>{provider.diasDefuncionamento[0]} - {provider.diasDefuncionamento[provider.diasDefuncionamento.length - 1]}</Text>
        <Text>{provider.abertura} - {provider.fechamento}</Text>
        <Text>{provider.endereco}</Text>
      </Flex>
    </Flex>
  )
}