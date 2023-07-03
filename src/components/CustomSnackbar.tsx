import { Snackbar } from "@mui/material";
import React, { forwardRef, useContext } from "react";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { QuizContext } from "../contexts/QuizContext";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar() {
    const { openSnackbar, setOpenSnackbar, severity, responseMessage } = useContext(QuizContext);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    return (
        <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>{responseMessage}</Alert>
        </Snackbar>
    );
}