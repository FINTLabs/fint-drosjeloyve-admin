import React from 'react';
import { Flex, Text } from "@chakra-ui/react";

const Header = () => {
    return (
        <Flex boxShadow="base" w="100%" pl={4} pt={2} pb={2} color="black" align="center">
            <Text color="#F76650" fontSize="3xl" as="h1">FINT Drosjeløyve Admin</Text>
        </Flex>
    );
};

export default Header;
