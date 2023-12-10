import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Radio,
  RadioGroup
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserType = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('cliente');

  const handleContinuar = () => {
    localStorage.setItem('userType', userType);
    navigate("/login")
  }

  return (
    <Flex justify={"center"} align={'center'} minH={'100vh'}>
      <Flex w={300}  
      >
        <FormControl>
          <FormLabel>Selecione seu tipo de usuário:</FormLabel>
          <RadioGroup defaultValue="cliente" onChange={(value) => setUserType(value)}>
            <Stack direction="column">
              <Radio value="cliente">Cliente</Radio>
              <Radio value="prestador">Prestador de Serviço</Radio>
              <Button mt={4} onClick={() => handleContinuar()}>Continuar</Button>
            </Stack>
          </RadioGroup>
        </FormControl>
        
      </Flex>
    </Flex>
  )
}


export default UserType;

