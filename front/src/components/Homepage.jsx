import {
    Box,
    Flex,
    Image,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Heading,
} from '@chakra-ui/react';
// import {
//   HamburgerIcon,
//   CloseIcon,
//   ChevronDownIcon,
//   ChevronRightIcon,
// } from '@chakra-ui/icons';

import img from "../assets/logo.png"

const navItems = [
    {
        label: "Home",
        href: "#"
    },
    {
        label: "Sobre nós",
        href: "#"
    },
    {
        label: "Serviços",
        href: "#"
    },
    {
        label: "Preços",
        href: "#"
    }
];

function HomeHeader() {
    return(
    <Box>
        <Flex
          height={"80px"}
          backgroundColor={"#EEFAFA"}
          borderBottom={"1px solid"}
          justify={"flex-start"}
        >
            {/* Logo */}
            <Box m={4}>
                <Image src={img}/>
            </Box>
            {/* Links */}
            <Flex mt="6">
                {navItems.map((item) => {
                    return <Heading key={item.label} href={item.href} cursor={"pointer"} fontSize={"22px"} ml="8">{item.label}</Heading>
                })}
            </Flex>
            <Button ml={"auto"} mr="16px" mt="16px" colorScheme='teal' size='lg' fontSize={"20px"}>
                Login
            </Button>
        </Flex>
    </Box>
    );
}

export default function Homepage() {
    return(
    <Box>
        <HomeHeader />
        <Flex alignItems={"center"} height={"80vh"}>
            <Text ml={4} width={"55%"} fontSize="2xl">
                <strong>O sistema de agendamentos que veio para facilitar a sua vida.</strong> Seja como prestador de serviço ou cliente, aqui você está a um click de encontrar o serviço que deseja, na hora que você quer e sem perder tempo. <strong>Tá esperando o que? Salve Essa Data!</strong>
            </Text>
            <Box ml="auto">
                <Image src={img}/>
            </Box>
        </Flex>
    </Box>
    );
}