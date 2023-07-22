import { useQuery } from "react-query";
import NavBar from "../components/NavBar";
import { fetchGet } from "../utils/Fetches";
import { urls } from "../utils/urls";
import { Encyclopedia } from "../models/Encyclopedia";
import { Box, Container, Typography } from "@mui/material";
import HomeNavigation from "../components/HomeNavigation";

export default function EncyclopediaPage() {

    const { data } = useQuery<Encyclopedia[]>(["encyclopedia"], ({ signal }) => fetchGet(urls.encyclopedia, signal));

    return (
        <>
            <NavBar title="Encyklopedie" />
            <Container sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {data?.map((e, index) =>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mx: 2, m: 2 }}>
                        <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${data[index].flagName}/shiny/64.png`} alt={e.flagName} />
                        <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>{e.stateName}</Typography>
                        <Typography sx={{ mb: 2 }}>{"Hlavní město: " + e.capitalName}</Typography>
                    </Box>
                )}
            </Container>
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <HomeNavigation />
            </Container>
        </>
    );
}