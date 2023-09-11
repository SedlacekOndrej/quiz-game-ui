import { useQuery } from "react-query";
import NavBar from "../components/NavBar";
import { fetchGet } from "../utils/Fetches";
import { urls } from "../utils/urls";
import { Encyclopedia } from "../models/Encyclopedia";
import { Box, Container, TextField, Typography } from "@mui/material";
import HomeNavigation from "../components/HomeNavigation";
import { ChangeEvent, useState } from "react";

export default function EncyclopediaPage() {
    const [searchedValue, setSearchedValue] = useState<string>("");
    const unidecode = require('unidecode');

    const { data } = useQuery<Encyclopedia[]>(["encyclopedia"], ({ signal }) => fetchGet(urls.encyclopedia, signal));

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearchedValue(e.target.value);

    const filteredStates = data?.filter(state =>
        unidecode(state.stateName.toLowerCase()).includes(unidecode(searchedValue).toLowerCase()) ||
        unidecode(state.capitalName.toLowerCase()).includes(unidecode(searchedValue).toLowerCase())
    );

    return (
        <>
            <NavBar title="Encyklopedie" />
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <TextField
                    sx={{ my: 5, width: 400 }}
                    variant="filled"
                    value={searchedValue}
                    onChange={handleInputChange}
                    label="Hledejte podle názvu státu nebo hlavního města"
                />
                <Container sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    {filteredStates?.map((state, index) =>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mx: 2, m: 2 }}>
                            <img
                                style={{ width: "100px", height: "100px" }}
                                src={`https://flagsapi.com/${filteredStates[index].flagName}/shiny/64.png`}
                                alt={state.flagName}
                            />
                            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>{state.stateName}</Typography>
                            <Typography sx={{ mb: 2 }}>{"Hlavní město: " + state.capitalName}</Typography>
                        </Box>
                    )}
                </Container>
                <HomeNavigation />
            </Container>
        </>
    );
}