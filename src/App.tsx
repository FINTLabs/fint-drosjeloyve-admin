import React, {useEffect, useState} from 'react';
import {
    Box,
    chakra,
    Input,
    InputGroup,
    InputLeftElement,
    Progress,
    SimpleGrid,
    Tag,
    Text
} from '@chakra-ui/react';
import {Application} from "./model/Application";
import axios from 'axios';
import {SearchIcon} from "@chakra-ui/icons";
import Header from "./component/Header";
import StatCard from "./component/StatCard";
import OrganisationFilter from "./component/OrganisationFilter";


const Table = chakra('table');
const TableRow = chakra('tr', {
    baseStyle: {
        _even: {bg: "gray.100"}
    }
});
const TableCell = chakra('td', {
    baseStyle: {
        padding: '8px',
    },
});
const TableHeader = chakra('th', {
    baseStyle: {
        padding: '8px',
    },
});


function App() {

    const [applications, setApplicaiton] = useState<Application[]>([]);
    const [status, setStatus] = useState<string[]>([]);
    const [organisations, setOrganisations] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const [filterOrganisation, setFilterOrganisation] = useState<string>('ALL');

    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/organisations').then(result => {
            if (result.status === 200) {
                setOrganisations(Object.assign(result.data, {"ALL": "Alle"}));
            }
            axios.get('/api/status').then(result => {
                if (result.status === 200) {
                    setStatus(result.data);
                }
                axios.get('/api/applications').then(result => {
                    if (result.status === 200) {
                        setApplicaiton(result.data);
                    }
                    setIsLoading(false);
                });
            });
        })

    }, []);

    const getStatsByStatus = (status: string): number => {
        return applications.filter(application => application.status === status).length;
    };

    return (
        <Box>
            <Header/>
            {isLoading && <Progress size="xs" isIndeterminate/>}
            <Box p={8}>
                <SimpleGrid columns={4} spacing={2} pb={2} id={"status"}>
                    <StatCard filterStatus={filterStatus}
                              onClick={() => setFilterStatus(null)}
                              statNumber={applications.length}
                              statLabel="total"
                    />
                    {status && status.map(s => (
                        <StatCard key={s} filterStatus={filterStatus}
                                  onClick={() => setFilterStatus(s)}
                                  statNumber={getStatsByStatus(s)}
                                  statLabel={s}
                        />
                    ))}
                </SimpleGrid>

                <InputGroup>
                    <Input placeholder="Søk" onChange={(e) => setFilter(e.target.value)}/>
                    <InputLeftElement children={<SearchIcon color="gray.500"/>}/>
                </InputGroup>
                <OrganisationFilter
                    setFilterOrganisation={(e) => setFilterOrganisation(e)}
                    filterOrganisation={filterOrganisation}
                    organisations={organisations}
                    applications={applications}
                />
                <Box p={2}>
                    <Table w="100%">
                        <thead>
                        <TableRow>
                            <TableHeader align="left">Fylke</TableHeader>
                            <TableHeader align="left">Altinn referanse</TableHeader>
                            <TableHeader align="left">Søker</TableHeader>
                            <TableHeader align="left">Status</TableHeader>
                            <TableHeader align="left">Saksnummer</TableHeader>
                            <TableHeader align="left">Opprettet</TableHeader>
                            <TableHeader align="left">Oppdatert</TableHeader>
                        </TableRow>
                        </thead>
                        <tbody>
                        {applications && applications
                            .filter((application) =>
                                filter.match(/AR[0-9].*/i)
                                    ? application.archiveReference.toLowerCase().startsWith(filter.toLowerCase())
                                    : application.subjectName.toLowerCase().includes(filter.toLowerCase())
                            )
                            .filter(application => filterOrganisation === 'ALL' ? true : application.requestor === filterOrganisation)
                            .filter((application) => filterStatus ? application.status === filterStatus : true)
                            .map(application => (
                                <TableRow key={application.archiveReference}>

                                    <TableCell><Text
                                        fontSize="sm">{application.requestorName}</Text></TableCell>
                                    <TableCell><Text
                                        fontSize="sm">{application.archiveReference}</Text></TableCell>
                                    <TableCell><Text
                                        fontSize="sm">{application.subjectName}</Text></TableCell>
                                    <TableCell><Tag variant="solid" colorScheme="green"
                                                    size="sm">{application.status}</Tag></TableCell>
                                    <TableCell><Text
                                        fontSize="sm">{application.caseId}</Text></TableCell>
                                    <TableCell>
                                        <Text
                                            fontSize="sm">{new Date(application.archivedDate).toLocaleString()}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text
                                            fontSize="sm">{new Date(application.updatedDate).toLocaleString()}</Text>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </Box>
            </Box>
        </Box>
    );
}

export default App;
