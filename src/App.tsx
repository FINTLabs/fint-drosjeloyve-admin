import React, { useEffect, useState } from "react"
import {
    Box,
    chakra,
    Input,
    InputGroup,
    Progress,
    SimpleGrid,
    Tag,
    Text,
    Icon,
} from "@chakra-ui/react"
import { Application } from "./model/Application"
import axios from "axios"
import Header from "./component/Header"
import StatCard from "./component/StatCard"
import OrganisationFilter from "./component/OrganisationFilter"
import { LuSearch } from "react-icons/lu"

const StyledTable = chakra("table", {
    base: { width: "100%", borderCollapse: "collapse" },
})

const TableRow = chakra("tr", {
    base: { _even: { bg: "gray.50" } },
})

const TableCell = chakra("td", {
    base: { padding: "8px" },
})

const TableHeader = chakra("th", {
    base: { padding: "8px", textAlign: "left" },
})

function App() {
    const [applications, setApplications] = useState<Application[]>([])
    const [status, setStatus] = useState<string[]>([])
    const [organisations, setOrganisations] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState("")
    const [filterStatus, setFilterStatus] = useState<string | null>(null)
    const [filterOrganisation, setFilterOrganisation] = useState("ALL")

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)

                const [orgRes, statusRes, appRes] = await Promise.all([
                    axios.get("/api/organisations"),
                    axios.get("/api/status"),
                    axios.get("/api/applications"),
                ])

                setOrganisations({ ...orgRes.data, ALL: "Alle" })
                setStatus(statusRes.data)
                setApplications(appRes.data)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const getStatsByStatus = (s: string): number =>
        applications.filter((a) => a.status === s).length

    const filteredApplications = applications
        .filter((application) =>
            filter.match(/AR[0-9].*/i)
                ? application.archiveReference
                    .toLowerCase()
                    .startsWith(filter.toLowerCase())
                : application.subjectName
                    .toLowerCase()
                    .includes(filter.toLowerCase())
        )
        .filter((application) =>
            filterOrganisation === "ALL"
                ? true
                : application.requestor === filterOrganisation
        )
        .filter((application) =>
            filterStatus ? application.status === filterStatus : true
        )

    return (
        <Box>
            <Header />

            {isLoading && (
                <Progress.Root size="xs">
                    <Progress.Track />
                </Progress.Root>
            )}

            <Box p={8}>
                <SimpleGrid columns={4} gap={2} pb={4}>
                    <StatCard
                        filterStatus={filterStatus}
                        onClick={() => setFilterStatus(null)}
                        statNumber={applications.length}
                        statLabel="Total"
                    />

                    {status.map((s) => (
                        <StatCard
                            key={s}
                            filterStatus={filterStatus}
                            onClick={() => setFilterStatus(s)}
                            statNumber={getStatsByStatus(s)}
                            statLabel={s}
                        />
                    ))}
                </SimpleGrid>

                <InputGroup
                    mb={4}
                    startElement={
                        <Icon color="gray.500">
                            <LuSearch />
                        </Icon>
                    }
                >
                    <Input
                        placeholder="Søk"
                        value={filter}
                        onChange={(e) => setFilter(e.currentTarget.value)}
                    />
                </InputGroup>

                <OrganisationFilter
                    setFilterOrganisation={setFilterOrganisation}
                    filterOrganisation={filterOrganisation}
                    organisations={organisations}
                    applications={applications}
                />

                <Box mt={4}>
                    <StyledTable>
                        <thead>
                        <TableRow>
                            <TableHeader>Fylke</TableHeader>
                            <TableHeader>Altinn referanse</TableHeader>
                            <TableHeader>Søker</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Saksnummer</TableHeader>
                            <TableHeader>Opprettet</TableHeader>
                            <TableHeader>Oppdatert</TableHeader>
                        </TableRow>
                        </thead>
                        <tbody>
                        {filteredApplications.map((application) => (
                            <TableRow key={application.archiveReference}>
                                <TableCell>
                                    <Text fontSize="sm">
                                        {application.requestorName}
                                    </Text>
                                </TableCell>

                                <TableCell>
                                    <Text fontSize="sm">
                                        {application.archiveReference}
                                    </Text>
                                </TableCell>

                                <TableCell>
                                    <Text fontSize="sm">
                                        {application.subjectName}
                                    </Text>
                                </TableCell>

                                <TableCell>
                                    <Tag.Root
                                        variant="solid"
                                        colorPalette="orange"
                                        size="sm"
                                    >
                                        <Tag.Label>{application.status}</Tag.Label>
                                    </Tag.Root>
                                </TableCell>

                                <TableCell>
                                    <Text fontSize="sm">{application.caseId}</Text>
                                </TableCell>

                                <TableCell>
                                    <Text fontSize="sm">
                                        {new Date(application.archivedDate).toLocaleString()}
                                    </Text>
                                </TableCell>

                                <TableCell>
                                    <Text fontSize="sm">
                                        {new Date(application.updatedDate).toLocaleString()}
                                    </Text>
                                </TableCell>
                            </TableRow>
                        ))}
                        </tbody>
                    </StyledTable>
                </Box>
            </Box>
        </Box>
    )
}

export default App