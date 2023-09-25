import {
    Box,
    Flex,
    Image,
    Text,
    Button,
    Heading,
} from '@chakra-ui/react';

import img from "../assets/logo.png";
import sideImg from "../assets/sammy-line-man-marks-days-on-calendar.png";
import trending1 from "../assets/barbearia.png";
import trending2 from "../assets/tatuador.png";
import trending3 from "../assets/manicure.png";
import { useNavigate } from 'react-router-dom';

function HomeHeader() {
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

    let navigate = useNavigate(); 

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
            <Button ml={"auto"} mr="16px" mt="16px" colorScheme='teal' size='lg' fontSize={"20px"} onClick={() => navigate("/login")}>
                Login
            </Button>
        </Flex>
    </Box>
    );
}

export default function Homepage() {
    const trending = [
        {
            label: "Radio Spider Barbershop",
            href: "#",
            picture: trending1,
            address: "Rua do Princípe, 225, Boa Vista, Recife",
            stars: 5.0
        },
        {
            label: "Don Black Tattoo",
            href: "#",
            picture: trending2,
            address: "Rua do Saudade, 25, Santo Amaro, Recife",
            stars: 5.0
        },
        {
            label: "Marinalva - Nails designer",
            href: "#",
            picture: trending3,
            address: "A domicílio",
            stars: 5.0
        }
    ]

    const trendingItems = trending.map((item) => {
        return (
            <Box key={item.label} mr="48px">
                <Image id="t" src={item.picture} borderRadius={4}/>
                <Text as="b">{item.label}</Text>
                <Text fontSize={"xs"}>{item.address}</Text>
            </Box>
        )
    })

    return(
    <Box>
        <HomeHeader />
        <Flex alignItems={"center"}>
            <Text ml={4} width={"55%"} fontSize="2xl" textAlign="justify">
                <strong>O sistema de agendamentos que veio para facilitar a sua vida.</strong> Seja como prestador de serviço ou cliente, aqui você está a um click de encontrar o serviço que deseja, na hora que você quer e sem perder tempo. <strong>Tá esperando o que? Salve Essa Data!</strong>
            </Text>
            <Box ml="auto" mr={32} >
                <Image src={sideImg}/>
            </Box>
        </Flex>
        <Box pos="fixed" bottom="0px">
        <Heading ml={4} mb={4}>Em destaque</Heading>
        <Flex ml={4} mb={4}>
            {trendingItems}
        </Flex>
        </Box>
    </Box>
    );
}