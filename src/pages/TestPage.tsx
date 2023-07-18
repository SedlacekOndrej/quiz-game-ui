import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNavigation from "../components/HomeNavigation";

export default function TestPage() {
    const questions = ["Česko", "Slovensko", "Polsko", "Rakousko"];
    const possibleAnswers = [
        "Praha", "Madrid", "Vilnius", "Riga",
        "Řím", "Bratislava", "Praha", "Minsk",
        "Lisabon", "Londýn", "Varšava", "Brusel",
        "Bratislava", "Paříž", "Atény", "Vídeň"
    ];
    const rightAnswers = ["Praha", "Bratislava", "Varšava", "Vídeň"];
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    const navigate = useNavigate();

    const handleArrayChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;

        setUserAnswers((prevAnswers) => {
            const newArray = [...prevAnswers];
            while (newArray.length < index + 1) {
                newArray.push("");
            }
            newArray[index] = selectedValue;
            return newArray;
        });
    };

    const handleSendAnswers = () => navigate("/test-results", {
        state: {
            questions: questions,
            possibleAnswers: possibleAnswers,
            rightAnswers: rightAnswers,
            userAnswers: userAnswers
        }
    });

    return (
        <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <FormControl>
                {questions.map((question, index) =>
                    <Fragment key={index}>
                        <FormLabel sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }} id="question">{question}</FormLabel>
                        <RadioGroup sx={{ mt: 1 }} aria-labelledby="question" name={`answer${index + 1}`} onChange={handleArrayChange(index)} row>
                            <FormControlLabel value={possibleAnswers[index * 4]} control={<Radio />} label={possibleAnswers[index * 4]} />
                            <FormControlLabel value={possibleAnswers[(index * 4) + 1]} control={<Radio />} label={possibleAnswers[(index * 4) + 1]} />
                            <FormControlLabel value={possibleAnswers[(index * 4) + 2]} control={<Radio />} label={possibleAnswers[(index * 4) + 2]} />
                            <FormControlLabel value={possibleAnswers[(index * 4) + 3]} control={<Radio />} label={possibleAnswers[(index * 4) + 3]} />
                        </RadioGroup>
                    </Fragment>
                )}
            </FormControl>
            <Button sx={{ mt: 5 }} type="button" variant="contained" onClick={handleSendAnswers}>{"Odeslat odpovědi"}</Button>
            <HomeNavigation />
        </Container>
    );
}