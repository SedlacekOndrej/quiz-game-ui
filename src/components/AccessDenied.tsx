import { Container, Typography } from "@mui/material";

export default function AccessDenied() {
    
    return (
        <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography sx={{ m: 8, fontWeight: "bold", fontSize: 25 }}>{"Pro zobrazení této stránky se musíte přihlásit"}</Typography>
        </Container>
    );
}