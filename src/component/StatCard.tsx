import React from 'react';
import { Steps, Stat } from "@chakra-ui/react";

const StatCard = (props: { filterStatus: string | null, onClick: () => void, statNumber: number, statLabel: string }) => {
    return (
        <Stat.Root id={props.statLabel}
            border="1px"
            borderColor={props.filterStatus === props.statLabel ? "gray.500" : "gray.200"}
            bg={props.filterStatus === props.statLabel ? "gray.100" : "white"}
            borderRadius="6px" p={2}
            onClick={props.onClick}
            cursor="pointer"
            _hover={{bg: "gray.100"}}

        >
            <Stat.Label>{props.statLabel.toUpperCase()}</Stat.Label>
            <Stat.ValueText>{props.statNumber}</Stat.ValueText>
        </Stat.Root>
    );
};

export default StatCard;
