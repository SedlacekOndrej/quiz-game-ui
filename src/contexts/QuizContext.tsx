import { AlertColor } from '@mui/material/Alert';
import React, { createContext, useMemo, useState } from "react";

interface QuizContextType {
    usernameError: boolean
    setUsernameError: (usernameError: boolean) => void
    passwordError: boolean
    setPasswordError: (passwordError: boolean) => void
    passwordConfirmError: boolean
    setPasswordConfirmError: (passwordConfirmError: boolean) => void
    emailError: boolean
    setEmailError: (emailError: boolean) => void
    emailConfirmError: boolean
    setEmailConfirmError: (emailConfirmError: boolean) => void
    openSnackbar: boolean
    setOpenSnackbar: (openSnackbar: boolean) => void
    severity: AlertColor
    setSeverity: (severity: AlertColor) => void
    responseMessage: string
    setResponseMessage: (responseMessage: string) => void
}

export const QuizContext = createContext({} as QuizContextType);

interface QuizProviderProps {
    children?: React.ReactNode
}

export function QuizProvider (props: QuizProviderProps) {
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailConfirmError, setEmailConfirmError] = useState<boolean>(false);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [severity, setSeverity] = useState<AlertColor>("success");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const contextValue = useMemo(() => ({
        usernameError, setUsernameError,
        passwordError, setPasswordError,
        passwordConfirmError, setPasswordConfirmError,
        emailError, setEmailError,
        emailConfirmError, setEmailConfirmError,
        openSnackbar, setOpenSnackbar,
        severity, setSeverity,
        responseMessage, setResponseMessage
    }),
    [
        usernameError, setUsernameError,
        passwordError, setPasswordError,
        passwordConfirmError, setPasswordConfirmError,
        emailError, setEmailError,
        emailConfirmError, setEmailConfirmError,
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