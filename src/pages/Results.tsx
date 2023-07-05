import { Box, Button, Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeNavigation from "../components/HomeNavigation";

export default function Results() {
    const { score, failedStates, succeededStates, continent, secondsLeft, type } = useLocation().state;

    const navigate = useNavigate();

    const gameLink = () => navigate(`/${continent}?type=${type}`);

    return (
        <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography sx={{ m: 3, fontWeight: "bold", fontSize: 25 }}>{"Výsledky"}</Typography>
            <Typography sx={{ mb: 3, fontWeight: "bold", fontSize: 20 }}>{"Počet správných odpovědí: " + score}</Typography>
            <Typography sx={{ mb: 3 }}>{"Odpovědět na otázky jste stihl/a za " + secondsLeft + " sekund."}</Typography>
            {succeededStates.length !== 0 && <Box sx={{ p: 3, backgroundColor: "#c5e1a5", border: 1 }}>
                <Typography sx={{ mb: 1, fontSize: 18, fontWeight: "bold" }}>{"Správně zodpovězené státy:"}</Typography>
                <Typography>{succeededStates.join(", ")}</Typography>
            </Box>}
            {failedStates.length !== 0 && <Box sx={{ p: 3, mt: 3, backgroundColor: "#ef9a9a", border: 1 }}>
                <Typography sx={{ mb: 1, fontSize: 18, fontWeight: "bold" }}>{"Špatně zodpovězené státy:"}</Typography>
                <Typography>{failedStates.join(", ")}</Typography>
            </Box>}
            <Button sx={{ mt: 3 }} type="button" variant="contained" onClick={gameLink}>{"Zkusit znovu"}</Button>
            <HomeNavigation />
        </Container>
    );
}