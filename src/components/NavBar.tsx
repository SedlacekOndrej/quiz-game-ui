import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";
import { UserContext } from "../contexts/UserContext";

export default function NavBar() {
    const { user, setUser } = useContext(UserContext);
    const { setOpenSnackbar } = useContext(QuizContext);
    const navigate = useNavigate();

    const registrationLink = () => {
        setOpenSnackbar(false);
        navigate("/registration");
    };

    const loginLink = () => {
        setOpenSnackbar(false);
        navigate("/login");
    };

    const leaderboardsLink = () => {
        setOpenSnackbar(false);
        navigate("/leaderboards");
    };

    const accountLink = () => {
        setOpenSnackbar(false);
        navigate("/account");
    };

    const logout = () => {
        setOpenSnackbar(false);
        setUser(null);
        navigate("/");
    };

    return (
        <Box sx={{ height: 45, backgroundColor: "#1976d2", display: "flex", justifyContent: "space-between" }}>
            {user === null ?
            <Button sx={{ m: 0.5, color: "white" }} type="button" onClick={registrationLink}>{"Registrace"}</Button> :
            <Button sx={{ m: 0.5, mr: 6, color: "white" }} type="button" onClick={accountLink}>{"Účet"}</Button>}

            <Box sx={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
                <Button sx={{ m: 0.5, color: "white" }} type="button" onClick={leaderboardsLink}>{"Žebříček"}</Button>
            </Box>
            
            {user === null ?
            <Button sx={{ m: 0.5, float: "right", color: "white" }} type="button" onClick={loginLink}>{"Přihlášení"}</Button> :
            <Button sx={{ m: 0.5, float: "right", color: "white" }} type="button" onClick={logout}>{"Odhlášení"}</Button>}
        </Box>
    );
}