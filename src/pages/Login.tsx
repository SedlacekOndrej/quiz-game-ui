import { Button, Container, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from "react-query";
import { fetchPost } from "../utils/Fetches";
import { QuizContext } from "../contexts/QuizContext";
import { User } from "../models/User";
import { UserContext } from "../contexts/UserContext";
import HomeNavigation from "../components/HomeNavigation";
import { urls } from "../utils/Urls";
import NavBar from "../components/NavBar";

const schema = yup.object({
    username: yup.string().required("Povinné pole"),
    password: yup.string().required("Povinné pole")
});

type Inputs = yup.InferType<typeof schema>;

export default function Login() {
    const { setUser } = useContext(UserContext);
    const { setOpenSnackbar, setSeverity, setResponseMessage } = useContext(QuizContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = data => mutate(data);

    const { mutate } = useMutation((data: Inputs) => fetchPost(urls.login, data),
        {
            onSuccess: (response: { message: string, user: User }) => {
                const { message, user } = response;
                setUser(user);
                setSeverity("success");
                setResponseMessage(message);
                setOpenSnackbar(true);
                navigate("/");
            },
            onError: (message: string) => {
                setSeverity("error");
                setResponseMessage(message);
                setOpenSnackbar(true);
            }
        }
    );

    return (
        <>
            <NavBar title="Přihlášení" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ m: 3, fontWeight: "bold", fontSize: 25 }}>{"Přihlášení"}</Typography>

                    <TextField sx={{ m: 2, width: 350 }}
                        variant="filled"
                        label="Uživatelské jméno"
                        helperText={errors.username?.message}
                        error={!!errors.username?.message}
                        {...register("username")}
                    />

                    <TextField sx={{ m: 2, width: 350 }}
                        variant="filled"
                        label="Heslo"
                        helperText={errors.password?.message}
                        error={!!errors.password?.message}
                        type="password"
                        {...register("password")}
                    />

                    <Button sx={{ mt: 3 }} type="submit" variant="contained" size="large">{"Přihlásit"}</Button>

                    <HomeNavigation />
                </Container>
            </form>
        </>
    );
}