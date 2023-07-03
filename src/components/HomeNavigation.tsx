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
            <Button sx={{ m: 3 }} type="button" variant="outlined" onClick={homepageLink}>{"Hlavní stránka"}</Button>
            <CustomSnackbar />
        </>
    );
}