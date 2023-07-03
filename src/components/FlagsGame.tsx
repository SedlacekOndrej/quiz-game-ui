import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent } from "react";

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
            <FormLabel sx={{ mt: 3, fontWeight: "bold", fontSize: 20 }} id="question">
                <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[0]}/shiny/64.png`} alt="flag1"></img>
            </FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name="answer1" onChange={handleChange} row>
                <FormControlLabel value={states[0]} control={<Radio />} label={states[0]} disabled={timeOut} />
                <FormControlLabel value={states[1]} control={<Radio />} label={states[1]} disabled={timeOut} />
                <FormControlLabel value={states[2]} control={<Radio />} label={states[2]} disabled={timeOut} />
                <FormControlLabel value={states[3]} control={<Radio />} label={states[3]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[1]}/shiny/64.png`} alt="flag2"></img>
            </FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name="answer2" onChange={handleChange} row>
                <FormControlLabel value={states[4]} control={<Radio />} label={states[4]} disabled={timeOut} />
                <FormControlLabel value={states[5]} control={<Radio />} label={states[5]} disabled={timeOut} />
                <FormControlLabel value={states[6]} control={<Radio />} label={states[6]} disabled={timeOut} />
                <FormControlLabel value={states[7]} control={<Radio />} label={states[7]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[2]}/shiny/64.png`} alt="flag3"></img>
            </FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name="answer3" onChange={handleChange} row>
                <FormControlLabel value={states[8]} control={<Radio />} label={states[8]} disabled={timeOut} />
                <FormControlLabel value={states[9]} control={<Radio />} label={states[9]} disabled={timeOut} />
                <FormControlLabel value={states[10]} control={<Radio />} label={states[10]} disabled={timeOut} />
                <FormControlLabel value={states[11]} control={<Radio />} label={states[11]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[3]}/shiny/64.png`} alt="flag4"></img>
            </FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name="answer4" onChange={handleChange} row>
                <FormControlLabel value={states[12]} control={<Radio />} label={states[12]} disabled={timeOut} />
                <FormControlLabel value={states[13]} control={<Radio />} label={states[13]} disabled={timeOut} />
                <FormControlLabel value={states[14]} control={<Radio />} label={states[14]} disabled={timeOut} />
                <FormControlLabel value={states[15]} control={<Radio />} label={states[15]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[4]}/shiny/64.png`} alt="flag5"></img>
            </FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name="answer5" onChange={handleChange} row>
                <FormControlLabel value={states[16]} control={<Radio />} label={states[16]} disabled={timeOut} />
                <FormControlLabel value={states[17]} control={<Radio />} label={states[17]} disabled={timeOut} />
                <FormControlLabel value={states[18]} control={<Radio />} label={states[18]} disabled={timeOut} />
                <FormControlLabel value={states[19]} control={<Radio />} label={states[19]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[5]}/shiny/64.png`} alt="flag6"></img>
            </FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name="answer6" onChange={handleChange} row>
                <FormControlLabel value={states[20]} control={<Radio />} label={states[20]} disabled={timeOut} />
                <FormControlLabel value={states[21]} control={<Radio />} label={states[21]} disabled={timeOut} />
                <FormControlLabel value={states[22]} control={<Radio />} label={states[22]} disabled={timeOut} />
                <FormControlLabel value={states[23]} control={<Radio />} label={states[23]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[6]}/shiny/64.png`} alt="flag7"></img>
            </FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name="answer7" onChange={handleChange} row>
                <FormControlLabel value={states[24]} control={<Radio />} label={states[24]} disabled={timeOut} />
                <FormControlLabel value={states[25]} control={<Radio />} label={states[25]} disabled={timeOut} />
                <FormControlLabel value={states[26]} control={<Radio />} label={states[26]} disabled={timeOut} />
                <FormControlLabel value={states[27]} control={<Radio />} label={states[27]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[7]}/shiny/64.png`} alt="flag8"></img>
            </FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name="answer8" onChange={handleChange} row>
                <FormControlLabel value={states[28]} control={<Radio />} label={states[28]} disabled={timeOut} />
                <FormControlLabel value={states[29]} control={<Radio />} label={states[29]} disabled={timeOut} />
                <FormControlLabel value={states[30]} control={<Radio />} label={states[30]} disabled={timeOut} />
                <FormControlLabel value={states[31]} control={<Radio />} label={states[31]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[8]}/shiny/64.png`} alt="flag9"></img>
            </FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name="answer9" onChange={handleChange} row>
                <FormControlLabel value={states[32]} control={<Radio />} label={states[32]} disabled={timeOut} />
                <FormControlLabel value={states[33]} control={<Radio />} label={states[33]} disabled={timeOut} />
                <FormControlLabel value={states[34]} control={<Radio />} label={states[34]} disabled={timeOut} />
                <FormControlLabel value={states[35]} control={<Radio />} label={states[35]} disabled={timeOut} />
            </RadioGroup>
            <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">
                <img style={{ width: "100px", height: "100px" }} src={`https://flagsapi.com/${flags[9]}/shiny/64.png`} alt="flag10"></img>
            </FormLabel>
            <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name="answer10" onChange={handleChange} row>
                <FormControlLabel value={states[36]} control={<Radio />} label={states[36]} disabled={timeOut} />
                <FormControlLabel value={states[37]} control={<Radio />} label={states[37]} disabled={timeOut} />
                <FormControlLabel value={states[38]} control={<Radio />} label={states[38]} disabled={timeOut} />
                <FormControlLabel value={states[39]} control={<Radio />} label={states[39]} disabled={timeOut} />
            </RadioGroup>
        </FormControl>
    );
}