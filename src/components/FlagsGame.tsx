import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { ChangeEvent, Fragment } from "react";

interface FlagsGameProps {
    flags: string[]
    states: string[]
    timeOut?: boolean
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
    userAnswers?: string[]
    rightAnswers?: string[]
    finished?: boolean
}

export default function FlagsGame(props: FlagsGameProps) {
    const { flags, states, timeOut, handleChange, userAnswers, rightAnswers, finished } = props;

    const isChecked = (answer: string, index: number) => {
        if (userAnswers) {
            const userAnswerValues = Object.values(userAnswers);
            return userAnswerValues[index] === answer;
        }
        return false;
    };

    const isRightAnswer = (answer: string, index: number) => {
        if (rightAnswers) {
            return rightAnswers[index] === answer;
        }
        return false;
    };

    const getLabel = (answer: string, index: number) => {
        if (!finished) {
            return <Typography sx={{ fontSize: 20 }}>{answer}</Typography>;
        }
        return isRightAnswer(answer, index) ? <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>{answer}</Typography> :
            <Typography sx={{ fontSize: 20 }}>{answer}</Typography>;
    };

    const radioColor = (index: number) => isRightAnswer(states[index * 4], index) ? "success" : "error";

    return (
        <FormControl>
            {flags.map((flag, index) =>
                <Fragment key={index}>
                    <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 26 }} id="question">
                        <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[index]}/shiny/64.png`} alt={flag} />
                    </FormLabel>
                    <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name={`answer${index + 1}`} onChange={finished ? undefined : handleChange} row>

                        <FormControlLabel
                            sx={{ color: isRightAnswer(states[index * 4], index) ? green[600] : null }}
                            value={states[index * 4]}
                            control={<Radio color={finished ? radioColor(index) : undefined} />}
                            checked={finished ? isChecked(states[index * 4], index) : undefined}
                            label={getLabel(states[index * 4], index)}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(states[(index * 4) + 1], index) ? green[600] : null }}
                            value={states[(index * 4) + 1]}
                            control={<Radio color={finished ? radioColor(index) : undefined} />}
                            checked={finished ? isChecked(states[(index * 4) + 1], index) : undefined}
                            label={getLabel(states[(index * 4) + 1], index)}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(states[(index * 4) + 2], index) ? green[600] : null }}
                            value={states[(index * 4) + 2]}
                            control={<Radio color={finished ? radioColor(index) : undefined} />}
                            checked={finished ? isChecked(states[(index * 4) + 2], index) : undefined}
                            label={getLabel(states[(index * 4) + 2], index)}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(states[(index * 4) + 3], index) ? green[600] : null }}
                            value={states[(index * 4) + 3]}
                            control={<Radio color={finished ? radioColor(index) : undefined} />}
                            checked={finished ? isChecked(states[(index * 4) + 3], index) : undefined}
                            label={getLabel(states[(index * 4) + 3], index)}
                            disabled={timeOut}
                        />

                    </RadioGroup>
                </Fragment>
            )}
        </FormControl>
    );
}