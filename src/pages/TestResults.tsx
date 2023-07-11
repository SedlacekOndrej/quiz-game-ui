import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { green } from "@mui/material/colors";
import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeNavigation from "../components/HomeNavigation";
import { Answers } from "../models/Answers";

interface LocationState {
    questions: string[]
    possibleAnswers: string[]
    rightAnswers: string[]
    userAnswers: Answers
}

export default function TestResults() {
    const { state } = useLocation();
    const [{ questions, possibleAnswers, rightAnswers, userAnswers }] = useState<LocationState>(state);

    const isChecked = (answer: string) => {
        return Object.values(userAnswers).includes(answer);
    };

    const isRightAnswer = (answer: string) => {
        return Object.values(rightAnswers).includes(answer);
    };

    return (
        <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <FormControl>
                {questions.map((question: string, index) =>
                    <Fragment key={questions.indexOf(question)}>
                        <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">{question}</FormLabel>
                        <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" row>

                            <FormControlLabel
                                sx={{ color: isRightAnswer(possibleAnswers[index * 4]) ? green[600] : null }}
                                control={<Radio color={isRightAnswer(possibleAnswers[index * 4]) ? "success" : "error"} />}
                                label={possibleAnswers[index * 4]}
                                checked={isChecked(possibleAnswers[index * 4])}
                            />

                            <FormControlLabel
                                sx={{ color: isRightAnswer(possibleAnswers[(index * 4) + 1]) ? green[600] : null }}
                                control={<Radio color={isRightAnswer(possibleAnswers[(index * 4) + 1]) ? "success" : "error"} />}
                                label={possibleAnswers[(index * 4) + 1]}
                                checked={isChecked(possibleAnswers[(index * 4) + 1])}
                            />

                            <FormControlLabel
                                sx={{ color: isRightAnswer(possibleAnswers[(index * 4) + 2]) ? green[600] : null }}
                                control={<Radio color={isRightAnswer(possibleAnswers[(index * 4) + 2]) ? "success" : "error"} />}
                                label={possibleAnswers[(index * 4) + 2]}
                                checked={isChecked(possibleAnswers[(index * 4) + 2])}
                            />

                            <FormControlLabel
                                sx={{ color: isRightAnswer(possibleAnswers[(index * 4) + 3]) ? green[600] : null }}
                                control={<Radio color={isRightAnswer(possibleAnswers[(index * 4) + 3]) ? "success" : "error"} />}
                                label={possibleAnswers[(index * 4) + 3]}
                                checked={isChecked(possibleAnswers[(index * 4) + 3])}
                            />

                        </RadioGroup>
                    </Fragment>
                )}
            </FormControl>
            <HomeNavigation />
        </Container>
    );
}