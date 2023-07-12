import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { ChangeEvent, Fragment } from "react";

interface CapitalsGameProps {
    states: string[]
    cities: string[]
    timeOut?: boolean
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
    userAnswers?: string[]
    rightAnswers?: string[]
    finished?: boolean
}

export default function CapitalsGame(props: CapitalsGameProps) {
    const { states, cities, timeOut, handleChange, userAnswers, rightAnswers, finished } = props;

    const isChecked = (answer: string, index: number) => {
        if (finished) {
            if (userAnswers) {
                const userAnswerValues = Object.values(userAnswers);
                return userAnswerValues[index] === answer;
            }
        }
        return false;
    };

    const isRightAnswer = (answer: string, index: number) => {
        if (finished) {
            if (rightAnswers) {
                return rightAnswers[index] === answer;
            }
        }
        return false;
    };

    const getLabel = (answer: string, index: number) => {
        return isRightAnswer(answer, index) ? <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>{answer}</Typography> :
            <Typography sx={{ fontSize: 20 }}>{answer}</Typography>;
    };

    return (
        <FormControl>
            {states.map((state, index) =>
                <Fragment key={index}>
                    <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 26 }} id="state">{state}</FormLabel>

                    <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name={`answer${index + 1}`} onChange={handleChange} row>

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[index * 4], index) ? green[600] : null }}
                            value={cities[index * 4]}
                            control={<Radio color={finished && isRightAnswer(cities[index * 4], index) ? "success" : "error"} />}
                            defaultChecked={isChecked(cities[index * 4], index)}
                            label={getLabel(cities[index * 4], index)}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[(index * 4) + 1], index) ? green[600] : null }}
                            value={cities[(index * 4) + 1]}
                            control={<Radio color={finished && isRightAnswer(cities[(index * 4) + 1], index) ? "success" : "error"} />}
                            defaultChecked={isChecked(cities[(index * 4) + 1], index)}
                            label={getLabel(cities[(index * 4) + 1], index)}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[(index * 4) + 2], index) ? green[600] : null }}
                            value={cities[(index * 4) + 2]}
                            control={<Radio color={finished && isRightAnswer(cities[(index * 4) + 2], index) ? "success" : "error"} />}
                            defaultChecked={isChecked(cities[(index * 4) + 2], index)}
                            label={getLabel(cities[(index * 4) + 2], index)}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[(index * 4) + 3], index) ? green[600] : null }}
                            value={cities[(index * 4) + 3]}
                            control={<Radio color={finished && isRightAnswer(cities[(index * 4) + 3], index) ? "success" : "error"} />}
                            defaultChecked={isChecked(cities[(index * 4) + 3], index)}
                            label={getLabel(cities[(index * 4) + 3], index)}
                            disabled={timeOut}
                        />

                    </RadioGroup>
                </Fragment>
            )}
        </FormControl>
    );
}