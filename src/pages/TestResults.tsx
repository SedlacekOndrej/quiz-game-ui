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

    const isChecked = (answer: string, index: number) => {
        const userAnswerValues = Object.values(userAnswers);
        return userAnswerValues[index] === answer;
    };

    const isRightAnswer = (answer: string, index: number) => {
        return rightAnswers[index] === answer;
    };

    const getLabel = (answer: string, index: number) => {
        return isRightAnswer(answer, index) ? <strong>{answer}</strong> : answer;
    };

    return (
        <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <FormControl>
                {questions.map((question: string, index) =>
                    <Fragment key={index}>
                        <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">{question}</FormLabel>
                        <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" row>

                            <FormControlLabel
                                sx={{ color: isRightAnswer(possibleAnswers[index * 4], index) ? green[600] : null }}
                                control={<Radio color={isRightAnswer(possibleAnswers[index * 4], index) ? "success" : "error"} />}
                                label={getLabel(possibleAnswers[index * 4], index)}
                                checked={isChecked(possibleAnswers[index * 4], index)}
                            />

                            <FormControlLabel
                                sx={{ color: isRightAnswer(possibleAnswers[(index * 4) + 1], index) ? green[600] : null }}
                                control={<Radio color={isRightAnswer(possibleAnswers[(index * 4) + 1], index) ? "success" : "error"} />}
                                label={getLabel(possibleAnswers[(index * 4) + 1], index)}
                                checked={isChecked(possibleAnswers[(index * 4) + 1], index)}
                            />

                            <FormControlLabel
                                sx={{ color: isRightAnswer(possibleAnswers[(index * 4) + 2], index) ? green[600] : null }}
                                control={<Radio color={isRightAnswer(possibleAnswers[(index * 4) + 2], index) ? "success" : "error"} />}
                                label={getLabel(possibleAnswers[(index * 4) + 2], index)}
                                checked={isChecked(possibleAnswers[(index * 4) + 2], index)}
                            />

                            <FormControlLabel
                                sx={{ color: isRightAnswer(possibleAnswers[(index * 4) + 3], index) ? green[600] : null }}
                                control={<Radio color={isRightAnswer(possibleAnswers[(index * 4) + 3], index) ? "success" : "error"} />}
                                label={getLabel(possibleAnswers[(index * 4) + 3], index)}
                                checked={isChecked(possibleAnswers[(index * 4) + 3], index)}
                            />

                        </RadioGroup>
                    </Fragment>
                )}
            </FormControl>
            <HomeNavigation />
        </Container>
    );
}