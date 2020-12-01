import React from 'react';
import {Tag} from "@chakra-ui/react";

const OrganisationTag = (props: {
    organisationNumber: string,
    organisationName: string,
    onClick: (e: any) => void,
    filterOrganisation: string | null,
    organisationApplicationCount: number
}) => {
    return (
        <Tag
            id={props.organisationNumber}
            variant="solid"
            colorScheme={props.filterOrganisation === props.organisationNumber ? "gray" : "green"}
            size="md"
            onClick={props.onClick}
            cursor="pointer"
        >
            {props.organisationName} {props.organisationApplicationCount > 0 && '(' + props.organisationApplicationCount +')'}
        </Tag>
    );
};

export default OrganisationTag;
