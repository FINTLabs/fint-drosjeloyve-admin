import React from 'react';
import {Flex, Image, Text} from "@chakra-ui/react";
import logo from "../image/vigofint.png";

const Header = () => {
    return (
        <Flex boxShadow="base" w="100%" pl={4} pt={2} pb={2} color="black" align="center">
            <Image h={30} pr={8} src={logo}/>
            <Text color="gray.600" fontSize="3xl" as="h2">Drosjeløyve admin</Text>
        </Flex>
    );
};

export default Header;
