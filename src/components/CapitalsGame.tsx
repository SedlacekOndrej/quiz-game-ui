import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
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
            {states.map((state, index) =>
                <Fragment key={index}>
                    <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">
                        {(index + 1).toString() + ". " + states[states.indexOf(state)]}
                    </FormLabel>
                    <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name={`answer${index + 1}`} onChange={handleChange} row>

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[index * 4]) ? green[600] : null }}
                            value={cities[index * 4]}
                            control={<Radio color={isRightAnswer(cities[index * 4]) ? "success" : "error"} />}
                            checked={isChecked(cities[index * 4])}
                            label={cities[index * 4]}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[(index * 4) + 1]) ? green[600] : null }}
                            value={cities[(index * 4) + 1]}
                            control={<Radio color={isRightAnswer(cities[(index * 4) + 1]) ? "success" : "error"} />}
                            checked={isChecked(cities[(index * 4) + 1])}
                            label={cities[(index * 4) + 1]}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[(index * 4) + 2]) ? green[600] : null }}
                            value={cities[(index * 4) + 2]}
                            control={<Radio color={isRightAnswer(cities[(index * 4) + 2]) ? "success" : "error"} />}
                            checked={isChecked(cities[(index * 4) + 2])}
                            label={cities[(index * 4) + 2]}
                            disabled={timeOut}
                        />

                        <FormControlLabel
                            sx={{ color: isRightAnswer(cities[(index * 4) + 3]) ? green[600] : null }}
                            value={cities[(index * 4) + 3]}
                            control={<Radio color={isRightAnswer(cities[(index * 4) + 3]) ? "success" : "error"} />}
                            checked={isChecked(cities[(index * 4) + 3])}
                            label={cities[(index * 4) + 3]}
                            disabled={timeOut}
                        />

                    </RadioGroup>
                </Fragment>
            )}
        </FormControl>
    );
}