import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
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

    const isChecked = (answer: string) => {
        if (userAnswers) {
            return Object.values(userAnswers).includes(answer);
        }
        return false;
    };

    const isRightAnswer = (answer: string) => {
        if (rightAnswers) {
            return Object.values(rightAnswers).includes(answer);
        }
        return false;
    };

    return (
        <FormControl>
            {flags.map((flag, index) =>
                <Fragment key={index}>
                    <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                        <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[flags.indexOf(flag)]}/shiny/64.png`} alt={`flag${index + 1}`}></img>
                    </FormLabel>
                    <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name={`answer${index + 1}`} onChange={handleChange} row>

                    <FormControlLabel
                            sx={{ color: isRightAnswer(states[index * 4]) ? green[600] : null }}
                            value={states[index * 4]}
                            control={<Radio color={isRightAnswer(states[index * 4]) ? "success" : "error"} />}
                            checked={isChecked(states[index * 4])}
                            label={states[index * 4]}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(states[(index * 4) + 1]) ? green[600] : null }}
                            value={states[(index * 4) + 1]}
                            control={<Radio color={isRightAnswer(states[(index * 4) + 1]) ? "success" : "error"} />}
                            checked={isChecked(states[(index * 4) + 1])}
                            label={states[(index * 4) + 1]}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(states[(index * 4) + 2]) ? green[600] : null }}
                            value={states[(index * 4) + 2]}
                            control={<Radio color={isRightAnswer(states[(index * 4) + 2]) ? "success" : "error"} />}
                            checked={isChecked(states[(index * 4) + 2])}
                            label={states[(index * 4) + 2]}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(states[(index * 4) + 3]) ? green[600] : null }}
                            value={states[(index * 4) + 3]}
                            control={<Radio color={isRightAnswer(states[(index * 4) + 3]) ? "success" : "error"} />}
                            checked={isChecked(states[(index * 4) + 3])}
                            label={states[(index * 4) + 3]}
                            disabled={timeOut}
                        />

                    </RadioGroup>
                </Fragment>
            )}
        </FormControl>
    );
}