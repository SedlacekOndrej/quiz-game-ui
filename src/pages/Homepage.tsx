import { Box, Button, Container, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import CustomSnackbar from "../components/CustomSnackbar";
import { UserContext } from "../contexts/UserContext";

export default function Homepage() {
    const { user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const gameLink = (continent: string) => () => navigate(`/${continent}`);

    return (
        <>
            {user === null &&
                <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo" />
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
                </Container>}
                
            {user !== null &&
                <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo" />
                    <Typography sx={{ m: 3, fontWeight: "bold", fontSize: 25 }}>{"Vyber si kategorii"}</Typography>
                    <Button sx={{ mt: 2 }} size="large" onClick={handleClick}>{"Hlavní města"}</Button>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
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
                    <Tooltip title="Již brzy">
                        <Box sx={{ mt: 2 }}>
                            <Button size="large" disabled>{"Vlajky"}</Button>
                        </Box>
                    </Tooltip>
                </Container>}
            <CustomSnackbar />
        </>
    );
}