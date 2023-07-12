import { Button, Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CapitalsGame from "../components/CapitalsGame";
import FlagsGame from "../components/FlagsGame";
import HomeNavigation from "../components/HomeNavigation";

export default function Results() {
    const { score, continent, secondsLeft, gameType, questions, possibleAnswers, userAnswers, rightAnswers } = useLocation().state;

    const navigate = useNavigate();

    const gameLink = () => navigate(`/${continent}?type=${gameType}`);

    return (
        <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography sx={{ m: 3, fontWeight: "bold", fontSize: 25 }}>{"Výsledky"}</Typography>

            {gameType === "CAPITALS" &&
                <CapitalsGame states={questions} cities={possibleAnswers} userAnswers={userAnswers} rightAnswers={rightAnswers} finished />
            }

            {gameType === "FLAGS" &&
                <FlagsGame flags={questions} states={possibleAnswers} userAnswers={userAnswers} rightAnswers={rightAnswers} finished />
            }

            <Typography sx={{ mt: 3, fontWeight: "bold", fontSize: 20 }}>{"Počet správných odpovědí: " + score}</Typography>
            <Typography sx={{ mt: 3 }}>{"Odpovědět na otázky jste stihl/a za " + secondsLeft + " sekund."}</Typography>

            <Button sx={{ mt: 3 }} type="button" variant="contained" onClick={gameLink}>{"Zkusit znovu"}</Button>
            <HomeNavigation />
        </Container>
    );
}