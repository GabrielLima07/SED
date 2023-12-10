import { Flex, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function ErrorComponent() {
  return(
    <Flex 
      flexDir={'column'} 
      alignItems={'center'}
      justifyContent={'center'}
      minHeight={'100vh'}
      gap={4}
    >
      <Heading>
        Página não encontrada😥
      </Heading>
      <Link to="/">Clique aqui para Voltar para página inicial</Link>
    </Flex>
  )
}