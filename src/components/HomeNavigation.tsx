import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { QuizContext } from "../contexts/QuizContext";
import CustomSnackbar from "./CustomSnackbar";

export default function HomeNavigation() {
    const { setOpenSnackbar } = useContext(QuizContext);
    const navigate = useNavigate();

    const homepageLink = () => {
        setOpenSnackbar(false);
        navigate("/");
    };

    return (
        <>
            <Button sx={{ m: 3 }} variant="outlined" size="large" onClick={homepageLink}>{"Hlavní stránka"}</Button>
            <CustomSnackbar />
        </>
    );
}