import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { ChangeEvent, Fragment } from "react";

interface CapitalsGameProps {
    readonly states: string[]
    readonly cities: string[]
    readonly timeOut?: boolean
    readonly handleChange?: (index: number) => (event: ChangeEvent<HTMLInputElement>) => void
    readonly userAnswers?: string[]
    readonly rightAnswers?: string[]
    readonly finished?: boolean
}

export default function CapitalsGame(props: CapitalsGameProps) {
    const { states, cities, timeOut, handleChange, userAnswers, rightAnswers, finished } = props;

    const isChecked = (answer: string, index: number) => {
        if (userAnswers) {
            const userAnswerValues = Object.values(userAnswers);
            return userAnswerValues[index] === answer;
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

    const onChangeMethod = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        if (finished) return;

        if (handleChange) {
            return handleChange(index)(event);
        }
    };

    const getLabel = (answer: string, index: number) => {
        if (!finished) {
            return <Typography sx={{ fontSize: 20 }}>{answer}</Typography>;
        }
        return isRightAnswer(answer, index) ? <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>{answer}</Typography> :
            <Typography sx={{ fontSize: 20 }}>{answer}</Typography>;
    };

    const radioColor = (index: number, numberOfQuestion: number) => isRightAnswer(cities[(index * 4) + numberOfQuestion], index) ? "success" : "error";

    return (
        <FormControl>
            {states.map((state, index) =>
                <Fragment key={index}>
                    <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 26 }} id="state">{state}</FormLabel>

                    <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name={`answer${index + 1}`} onChange={onChangeMethod(index)} row>

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[index * 4], index) ? green[600] : null }}
                            value={cities[index * 4]}
                            control={<Radio color={finished ? radioColor(index, 0) : undefined} />}
                            checked={finished ? isChecked(cities[index * 4], index) : undefined}
                            label={getLabel(cities[index * 4], index)}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[(index * 4) + 1], index) ? green[600] : null }}
                            value={cities[(index * 4) + 1]}
                            control={<Radio color={finished ? radioColor(index, 1) : undefined} />}
                            checked={finished ? isChecked(cities[(index * 4) + 1], index) : undefined}
                            label={getLabel(cities[(index * 4) + 1], index)}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[(index * 4) + 2], index) ? green[600] : null }}
                            value={cities[(index * 4) + 2]}
                            control={<Radio color={finished ? radioColor(index, 2) : undefined} />}
                            checked={finished ? isChecked(cities[(index * 4) + 2], index) : undefined}
                            label={getLabel(cities[(index * 4) + 2], index)}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[(index * 4) + 3], index) ? green[600] : null }}
                            value={cities[(index * 4) + 3]}
                            control={<Radio color={finished ? radioColor(index, 3) : undefined} />}
                            checked={finished ? isChecked(cities[(index * 4) + 3], index) : undefined}
                            label={getLabel(cities[(index * 4) + 3], index)}
                            disabled={timeOut}
                        />

                    </RadioGroup>
                </Fragment>
            )}
        </FormControl>
    );
}