import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent, Fragment } from "react";

interface FlagsGameProps {
    flags: string[]
    states: string[]
    timeOut: boolean
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function FlagsGame(props: FlagsGameProps) {
    const { flags, states, timeOut, handleChange } = props;

    return (
        <FormControl>
            {flags.map(flag =>
                <Fragment>
                    <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                        <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[flags.indexOf(flag)]}/shiny/64.png`} alt="flag10"></img>
                    </FormLabel>
                    <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name={"answer".concat((flags.indexOf(flag) + 1).toString())} onChange={handleChange} row>
                        <FormControlLabel value={states[flags.indexOf(flag) * 4]} control={<Radio />} label={states[flags.indexOf(flag) * 4]} disabled={timeOut} />
                        <FormControlLabel value={states[(flags.indexOf(flag) * 4) + 1]} control={<Radio />} label={states[(flags.indexOf(flag) * 4) + 1]} disabled={timeOut} />
                        <FormControlLabel value={states[(flags.indexOf(flag) * 4) + 2]} control={<Radio />} label={states[(flags.indexOf(flag) * 4) + 2]} disabled={timeOut} />
                        <FormControlLabel value={states[(flags.indexOf(flag) * 4) + 3]} control={<Radio />} label={states[(flags.indexOf(flag) * 4) + 3]} disabled={timeOut} />
                    </RadioGroup>
                </Fragment>
            )}
        </FormControl>
    );
}