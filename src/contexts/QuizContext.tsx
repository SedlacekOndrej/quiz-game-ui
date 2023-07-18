import { AlertColor } from '@mui/material/Alert';
import React, { createContext, Dispatch, SetStateAction, useMemo, useState } from "react";

interface QuizContextType {
    openSnackbar: boolean
    setOpenSnackbar: Dispatch<SetStateAction<boolean>>
    severity: AlertColor
    setSeverity: Dispatch<SetStateAction<AlertColor>>
    responseMessage: string
    setResponseMessage: Dispatch<SetStateAction<string>>
}

export const QuizContext = createContext({} as QuizContextType);

interface QuizProviderProps {
    children?: React.ReactNode
}

export function QuizProvider (props: QuizProviderProps) {
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [severity, setSeverity] = useState<AlertColor>("success");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const contextValue = useMemo(() => ({
        openSnackbar, setOpenSnackbar,
        severity, setSeverity,
        responseMessage, setResponseMessage
    }),
    [
        openSnackbar, setOpenSnackbar,
        severity, setSeverity,
        responseMessage, setResponseMessage
    ]);

    return (
        <QuizContext.Provider value={contextValue}>
            {props.children}
        </QuizContext.Provider>
    );
}