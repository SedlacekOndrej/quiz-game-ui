import { Button, Container, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from "react-query";
import { fetchPost } from "../utils/Fetches";
import { QuizContext } from "../contexts/QuizContext";
import HomeNavigation from "../components/HomeNavigation";
import NavBar from "../components/NavBar";
import { urls } from "../utils/Urls";

const schema = yup.object({
    username: yup.string().required("Povinné pole").min(4, "Musí obsahovat alespoň 4 znaky"),
    password: yup.string().required("Povinné pole").min(6, "Musí obsahovat alespoň 6 znaků"),
    passwordConfirm: yup.string().required("Povinné pole").oneOf([yup.ref("password")], "Hesla se neshodují"),
    email: yup.string().required("Povinné pole").matches(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, "Nesprávný formát emailu"),
    emailConfirm: yup.string().required("Povinné pole").oneOf([yup.ref("email")], "Emaily se neshodují")
});

type Inputs = yup.InferType<typeof schema>;

export default function Registration() {
    const { setOpenSnackbar, setSeverity, setResponseMessage } = useContext(QuizContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = data => mutate(data);

    const { mutate } = useMutation((data: Inputs) => fetchPost(urls.registration, data),
        {
            onSuccess: (response: { message: string }) => {
                const { message } = response;
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
            <NavBar title="Registrace" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ m: 3, fontWeight: "bold", fontSize: 25 }}>{"Registrace"}</Typography>

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

                    <TextField sx={{ m: 2, width: 350 }}
                        variant="filled"
                        label="Ověření hesla"
                        helperText={errors.passwordConfirm?.message}
                        error={!!errors.passwordConfirm?.message}
                        type="password"
                        {...register("passwordConfirm")}
                    />

                    <TextField sx={{ m: 2, width: 350 }}
                        variant="filled"
                        label="Email"
                        helperText={errors.email?.message}
                        error={!!errors.email?.message}
                        {...register("email")}
                    />

                    <TextField sx={{ m: 2, width: 350 }}
                        variant="filled"
                        label="Ověření emailu"
                        helperText={errors.emailConfirm?.message}
                        error={!!errors.emailConfirm?.message}
                        {...register("emailConfirm")}
                    />

                    <Button sx={{ mt: 3 }} type="submit" variant="contained" size="large">{"Registrovat"}</Button>
                    <HomeNavigation />
                </Container>
            </form>
        </>
    );
}