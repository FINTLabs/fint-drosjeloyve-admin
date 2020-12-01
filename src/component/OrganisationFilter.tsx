import React from 'react';
import {Box, Wrap, WrapItem} from "@chakra-ui/react";
import OrganisationTag from "./OrganisationTag";
import {Application} from "../model/Application";

const OrganisationFilter = (props: {
    setFilterOrganisation: (organisation: string) => void
    filterOrganisation: string,
    organisations: any[],
    applications: Application[],


}) => {

    const getApplicationCountByOrganisation = (organisation: string): number => {
        return props.applications.filter(application => application.requestor === organisation).length;
    }
    return (
        <Box p={2}>
            <Box>
                <Wrap>
                    {props.organisations && Object.entries(props.organisations)
                        .reverse()
                        .map(([k, v]) => (
                        <WrapItem key={k}>
                            <OrganisationTag
                                organisationNumber={k}
                                organisationName={v}
                                onClick={(e) => props.setFilterOrganisation(e.currentTarget.id)}
                                filterOrganisation={props.filterOrganisation}
                                organisationApplicationCount={getApplicationCountByOrganisation(k)}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
            </Box>
        </Box>
    );
};

export default OrganisationFilter;
