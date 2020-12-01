import React from 'react';
import {Stat, StatLabel, StatNumber} from "@chakra-ui/react";

const StatCard = (props: { filterStatus: string | null, onClick: () => void, statNumber: number, statLabel: string }) => {
    console.log("filterStatus", props.filterStatus)
    return <Stat
        border="1px"
        borderColor={props.filterStatus === props.statLabel ? "gray.500" : "gray.200"}
        bg={props.filterStatus === props.statLabel ? "gray.100" : "white"}
        borderRadius="6px" p={2}
        onClick={props.onClick}
        cursor="pointer"
        _hover={{bg: "gray.100"}}

    >
        <StatLabel>{props.statLabel.toUpperCase()}</StatLabel>
        <StatNumber>{props.statNumber}</StatNumber>
    </Stat>;
};

export default StatCard;
