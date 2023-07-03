import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent } from "react";

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
            <FormLabel sx={{ mt: 3, fontWeight: "bold", fontSize: 20 }} id="state">{"1. " + states[0]}</FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="state" name="answer1" onChange={handleChange} row>
                <FormControlLabel value={cities[0]} control={<Radio />} label={cities[0]} disabled={timeOut} />
                <FormControlLabel value={cities[1]} control={<Radio />} label={cities[1]} disabled={timeOut} />
                <FormControlLabel value={cities[2]} control={<Radio />} label={cities[2]} disabled={timeOut} />
                <FormControlLabel value={cities[3]} control={<Radio />} label={cities[3]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">{"2. " + states[1]}</FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="state" name="answer2" onChange={handleChange} row>
                <FormControlLabel value={cities[4]} control={<Radio />} label={cities[4]} disabled={timeOut} />
                <FormControlLabel value={cities[5]} control={<Radio />} label={cities[5]} disabled={timeOut} />
                <FormControlLabel value={cities[6]} control={<Radio />} label={cities[6]} disabled={timeOut} />
                <FormControlLabel value={cities[7]} control={<Radio />} label={cities[7]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">{"3. " + states[2]}</FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="state" name="answer3" onChange={handleChange} row>
                <FormControlLabel value={cities[8]} control={<Radio />} label={cities[8]} disabled={timeOut} />
                <FormControlLabel value={cities[9]} control={<Radio />} label={cities[9]} disabled={timeOut} />
                <FormControlLabel value={cities[10]} control={<Radio />} label={cities[10]} disabled={timeOut} />
                <FormControlLabel value={cities[11]} control={<Radio />} label={cities[11]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">{"4. " + states[3]}</FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="state" name="answer4" onChange={handleChange} row>
                <FormControlLabel value={cities[12]} control={<Radio />} label={cities[12]} disabled={timeOut} />
                <FormControlLabel value={cities[13]} control={<Radio />} label={cities[13]} disabled={timeOut} />
                <FormControlLabel value={cities[14]} control={<Radio />} label={cities[14]} disabled={timeOut} />
                <FormControlLabel value={cities[15]} control={<Radio />} label={cities[15]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">{"5. " + states[4]}</FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="state" name="answer5" onChange={handleChange} row>
                <FormControlLabel value={cities[16]} control={<Radio />} label={cities[16]} disabled={timeOut} />
                <FormControlLabel value={cities[17]} control={<Radio />} label={cities[17]} disabled={timeOut} />
                <FormControlLabel value={cities[18]} control={<Radio />} label={cities[18]} disabled={timeOut} />
                <FormControlLabel value={cities[19]} control={<Radio />} label={cities[19]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">{"6. " + states[5]}</FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="state" name="answer6" onChange={handleChange} row>
                <FormControlLabel value={cities[20]} control={<Radio />} label={cities[20]} disabled={timeOut} />
                <FormControlLabel value={cities[21]} control={<Radio />} label={cities[21]} disabled={timeOut} />
                <FormControlLabel value={cities[22]} control={<Radio />} label={cities[22]} disabled={timeOut} />
                <FormControlLabel value={cities[23]} control={<Radio />} label={cities[23]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">{"7. " + states[6]}</FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="state" name="answer7" onChange={handleChange} row>
                <FormControlLabel value={cities[24]} control={<Radio />} label={cities[24]} disabled={timeOut} />
                <FormControlLabel value={cities[25]} control={<Radio />} label={cities[25]} disabled={timeOut} />
                <FormControlLabel value={cities[26]} control={<Radio />} label={cities[26]} disabled={timeOut} />
                <FormControlLabel value={cities[27]} control={<Radio />} label={cities[27]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">{"8. " + states[7]}</FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="state" name="answer8" onChange={handleChange} row>
                <FormControlLabel value={cities[28]} control={<Radio />} label={cities[28]} disabled={timeOut} />
                <FormControlLabel value={cities[29]} control={<Radio />} label={cities[29]} disabled={timeOut} />
                <FormControlLabel value={cities[30]} control={<Radio />} label={cities[30]} disabled={timeOut} />
                <FormControlLabel value={cities[31]} control={<Radio />} label={cities[31]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">{"9. " + states[8]}</FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="state" name="answer9" onChange={handleChange} row>
                <FormControlLabel value={cities[32]} control={<Radio />} label={cities[32]} disabled={timeOut} />
                <FormControlLabel value={cities[33]} control={<Radio />} label={cities[33]} disabled={timeOut} />
                <FormControlLabel value={cities[34]} control={<Radio />} label={cities[34]} disabled={timeOut} />
                <FormControlLabel value={cities[35]} control={<Radio />} label={cities[35]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="state">{"10. " + states[9]}</FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="state" name="answer10" onChange={handleChange} row>
                <FormControlLabel value={cities[36]} control={<Radio />} label={cities[36]} disabled={timeOut} />
                <FormControlLabel value={cities[37]} control={<Radio />} label={cities[37]} disabled={timeOut} />
                <FormControlLabel value={cities[38]} control={<Radio />} label={cities[38]} disabled={timeOut} />
                <FormControlLabel value={cities[39]} control={<Radio />} label={cities[39]} disabled={timeOut} />
            </RadioGroup>
        </FormControl>
    );
}