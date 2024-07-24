import { Button, Container, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";

export default function Homepage() {
    const { user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [gameType, setGameType] = useState<string>("");
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleCapitalsClick = (event: React.MouseEvent<HTMLElement>) => {
        setGameType("capitals");
        setAnchorEl(event.currentTarget);
    };

    const handleFlagsClick = (event: React.MouseEvent<HTMLElement>) => {
        setGameType("flags");
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => setAnchorEl(null);

    const gameLink = (continent: string) => () => navigate(`/${continent}?type=${gameType}&questions=${numberOfQuestions}`);

    const handleChange = (event: React.MouseEvent<HTMLElement>, number: number) => setNumberOfQuestions(number);

    return (
        <>
            <NavBar title="Hlavní stránka" />
            {user === null &&
                <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={process.env.PUBLIC_URL + '/globe256.png'} alt="logo" />
                    <Typography sx={{ mt: 3, fontWeight: "bold", fontSize: 30 }}>
                        {"Vítejte ve hře Kvíz!"}
                    </Typography>
                    <Typography sx={{ mt: 3, fontWeight: "bold", fontSize: 20 }}>
                        {"V této hře si můžete otestovat svoje znalosti zeměpisu a porovnat se s ostatními"}
                    </Typography>
                    <Typography sx={{ mt: 3, fontWeight: "bold", fontSize: 20 }}>
                        {"Znáte hlavní města všech států světa?"}
                    </Typography>
                    <Typography sx={{ mt: 3, fontWeight: "bold", fontSize: 20 }}>
                        {"Správnými odpověďmi získávejte zkušenosti, které Vám zvýší úroveň"}
                    </Typography>
                    <Typography sx={{ mt: 3, fontWeight: "bold", fontSize: 20 }}>
                        {"Zaregistrujte se nyní a ukažte všem, že právě VY jste tím nejlepším znalcem!"}
                    </Typography>
                </Container>
            }

            {user !== null &&
                <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={process.env.PUBLIC_URL + '/globe256.png'} alt="Logo" />

                    <Typography sx={{ m: 3, fontWeight: "bold", fontSize: 25 }}>{"Vyber si kategorii"}</Typography>
                    <Button size="large" onClick={handleCapitalsClick}>{"Hlavní města"}</Button>
                    <Button sx={{ mb: 3 }} size="large" onClick={handleFlagsClick}>{"Vlajky"}</Button>

                    <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu} onClick={handleCloseMenu}>
                        <MenuItem onClick={gameLink("europe")}>
                            <Typography>{"Evropa"}</Typography>
                        </MenuItem>
                        <MenuItem onClick={gameLink("america")}>
                            <Typography>{"Severní a Jižní Amerika"}</Typography>
                        </MenuItem>
                        <MenuItem onClick={gameLink("asia")}>
                            <Typography>{"Asie a Oceánie"}</Typography>
                        </MenuItem>
                        <MenuItem onClick={gameLink("africa")}>
                            <Typography>{"Afrika"}</Typography>
                        </MenuItem>
                    </Menu>

                    <Typography sx={{ mb: 2, fontWeight: "bold", fontSize: 25 }}>{"Počet otázek"}</Typography>
                    <ToggleButtonGroup sx={{ mb: 2 }} value={numberOfQuestions} onChange={handleChange} size="large" color="primary" exclusive>
                        <ToggleButton value={10} disabled={numberOfQuestions === 10}>{"10"}</ToggleButton>
                        <ToggleButton value={20} disabled={numberOfQuestions === 20 || user.level < 5}>{"20"}</ToggleButton>
                    </ToggleButtonGroup>

                </Container>
            }
        </>
    );
}