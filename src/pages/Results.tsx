import { Button, Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CapitalsGame from "../components/CapitalsGame";
import FlagsGame from "../components/FlagsGame";
import HomeNavigation from "../components/HomeNavigation";
import NavBar from "../components/NavBar";

export default function Results() {
    const { score, continent, secondsLeft, gameType, questions, possibleAnswers, userAnswers, rightAnswers } = useLocation().state;

    const navigate = useNavigate();

    const gameLink = () => navigate(`/${continent}?type=${gameType}`);

    const continentName = () => {
        switch (continent) {
            case "europe": return "Evropa";
            case "asia": return "Asie a Oceánie";
            case "america": return "Amerika";
            case "africa": return "Afrika";
        }
    };

    return (
        <>
            <NavBar title={"Výsledky - " + continentName()} />
            <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography sx={{ m: 3, fontWeight: "bold", fontSize: 25 }}>{continentName() + " - Výsledky"}</Typography>

                <Typography sx={{ mb: 3, fontWeight: "bold", fontSize: 20 }}>{"Počet správných odpovědí: " + score}</Typography>
                <Typography>{"Odpovědět na otázky jste stihl/a za " + secondsLeft + " sekund."}</Typography>

                {gameType === "CAPITALS" &&
                    <CapitalsGame states={questions} cities={possibleAnswers} userAnswers={userAnswers} rightAnswers={rightAnswers} finished />
                }

                {gameType === "FLAGS" &&
                    <FlagsGame flags={questions} states={possibleAnswers} userAnswers={userAnswers} rightAnswers={rightAnswers} finished />
                }

                <Button sx={{ mt: 3 }} type="button" variant="contained" onClick={gameLink}>{"Zkusit znovu"}</Button>
                <HomeNavigation />
            </Container>
        </>
    );
}