import { Button, Fab, Grid, Container } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import AccessDenied from "../components/AccessDenied";
import CapitalsGame from "../components/CapitalsGame";
import FlagsGame from "../components/FlagsGame";
import HomeNavigation from "../components/HomeNavigation";
import { QuizContext } from "../contexts/QuizContext";
import { UserContext } from "../contexts/UserContext";
import { Answers } from "../models/Answers";
import { Questions } from "../models/Questions";
import { Submit } from "../models/Submit";
import { fetchGet, fetchPost } from "../utils/Fetches";
import { urls } from "../utils/urls";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Game() {
    const { user } = useContext(UserContext);
    const { setSeverity, setResponseMessage, setOpenSnackbar } = useContext(QuizContext);
    const [timer, setTimer] = useState<number>(30);
    const [userAnswers, setUserAnswers] = useState<Answers>({
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        answer5: "",
        answer6: "",
        answer7: "",
        answer8: "",
        answer9: "",
        answer10: ""
    });

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    const { data = {} as Questions } = useQuery<Questions>(["game"], ({ signal }) => fetchGet(urls.questions + params.continent + "?type=" + type, signal));

    const { gameType, questions, possibleAnswers } = data;

    const { mutate } = useMutation((data: Submit) => fetchPost(urls.submit, data),
        {
            onSuccess: (response: { score: number, rightAnswers: string[] }) => {
                const { score, rightAnswers } = response;
                navigate("/results", {
                    state: {
                        score: score,
                        continent: params.continent,
                        secondsLeft: 30 - timer,
                        gameType: gameType,
                        questions: questions,
                        possibleAnswers: possibleAnswers,
                        userAnswers: userAnswers,
                        rightAnswers: rightAnswers
                    }
                });
            },
            onError: (response: { message: string }) => {
                const { message } = response;
                setSeverity("error");
                setResponseMessage(message);
                setOpenSnackbar(true);
            }
        }
    );

    useEffect(() => {
        timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    }, [timer]);

    const continentName = () => {
        switch (params.continent) {
            case "europe": return "Evropa";
            case "america": return "Severní a Jižní Amerika";
            case "asia": return "Asie a Oceánie";
            case "africa": return "Afrika";
            default: return "";
        }
    };

    const timeOut = timer > 0 ? false : true;

    const color = timeOut ? "error" : "primary";

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserAnswers((prevAnswers) => ({ ...prevAnswers, [e.target.name]: e.target.value }));
    };

    const submitData = {
        username: user?.username,
        continent: params.continent,
        questions: questions,
        answers: userAnswers,
        gameTime: 30 - timer,
        gameType: gameType
    };

    const handleSendAnswers = () => mutate(submitData);

    return (
        <>
            <NavBar title={continentName()} />
            {user !== null ? <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>

                {gameType === "CAPITALS" &&
                    <CapitalsGame states={questions} cities={possibleAnswers} timeOut={timeOut} handleChange={handleChange} />
                }

                {gameType === "FLAGS" &&
                    <FlagsGame flags={questions} states={possibleAnswers} timeOut={timeOut} handleChange={handleChange} />
                }

                <Button sx={{ mt: 5 }} type="button" variant="contained" onClick={handleSendAnswers}>{"Odeslat odpovědi"}</Button>
                <HomeNavigation />

                <Grid container sx={{ position: 'fixed', bottom: 30, right: 30, justifyContent: "end", zIndex: -1 }}>
                    <Grid item xs={2} sx={{ textAlign: 'right' }}>
                        <Fab size="large" color={color} variant="extended">{timeOut ? "Čas vypršel" : "Zbývající čas: " + timer}</Fab>
                    </Grid>
                </Grid>
            </Container>
                :
                <AccessDenied />}
        </>
    );
}