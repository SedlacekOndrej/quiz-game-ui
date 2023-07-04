import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent, Fragment } from "react";

interface CapitalsGameProps {
    states: string[]
    cities: string[]
    timeOut: boolean
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function CapitalsGame(props: CapitalsGameProps) {
    const { states, cities, timeOut, handleChange } = props;

    return (
        <FormControl>
            {states.map(state =>
                <Fragment>
                    <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">
                        {(states.indexOf(state) + 1).toString() + ". " + states[states.indexOf(state)]}
                    </FormLabel>
                    <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name={"answer".concat((states.indexOf(state) + 1).toString())} onChange={handleChange} row>
                        <FormControlLabel value={cities[states.indexOf(state) * 4]} control={<Radio />} label={cities[states.indexOf(state) * 4]} disabled={timeOut} />
                        <FormControlLabel value={cities[(states.indexOf(state) * 4) + 1]} control={<Radio />} label={cities[(states.indexOf(state) * 4) + 1]} disabled={timeOut} />
                        <FormControlLabel value={cities[(states.indexOf(state) * 4) + 2]} control={<Radio />} label={cities[(states.indexOf(state) * 4) + 2]} disabled={timeOut} />
                        <FormControlLabel value={cities[(states.indexOf(state) * 4) + 3]} control={<Radio />} label={cities[(states.indexOf(state) * 4) + 3]} disabled={timeOut} />
                    </RadioGroup>
                </Fragment>
            )}
        </FormControl>
    );
}