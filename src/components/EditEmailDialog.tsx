import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";
import { EditSubmitData } from "../models/EditSubmitData";
import { fetchPut } from "../utils/Fetches";
import { urls } from "../utils/Urls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { QuizContext } from "../contexts/QuizContext";

const schema = yup.object({
    password: yup.string().required("Povinné pole"),
    email: yup.string().required("Povinné pole").matches(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, "Nesprávný formát emailu"),
    emailConfirm: yup.string().required("Povinné pole").oneOf([yup.ref("email")], "Emaily se neshodují")
});

type Inputs = yup.InferType<typeof schema>;

interface EditEmailDialogProps {
    readonly open: boolean
    readonly close: () => void
}

export default function EditEmailDialog(props: EditEmailDialogProps) {
    const { open, close } = props;
    const { user } = useContext(UserContext);
    const { setSeverity, setResponseMessage, setOpenSnackbar } = useContext(QuizContext);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = data => {
        if (user) {
            const updatedData = {
                password: data.password,
                user: { ...user, email: data.email }
            };
            mutate(updatedData);
        }
    };

    const { mutate } = useMutation((data: EditSubmitData) => fetchPut(urls.user + user?.id, data),
        {
            onSuccess: (response: { message: string }) => {
                const { message } = response;
                setSeverity("success");
                setResponseMessage(message);
                setOpenSnackbar(true);
                setValue("password", "");
                setValue("email", "");
                setValue("emailConfirm", "");
                close();
            },
            onError: (message: string) => {
                setSeverity("error");
                setResponseMessage(message);
                setOpenSnackbar(true);
            }
        }
    );

    return (
        <Dialog open={open} onClose={close}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <DialogTitle>{"Změnit email"}</DialogTitle>

                <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                    <TextField
                        sx={{ m: 2 }}
                        variant="filled"
                        label="Heslo"
                        helperText={errors.password?.message}
                        error={!!errors.password?.message}
                        type="password"
                        {...register("password")}
                    />

                    <TextField
                        sx={{ mb: 2 }}
                        variant="filled"
                        label="Nový email"
                        helperText={errors.email?.message}
                        error={!!errors.email?.message}
                        {...register("email")}
                    />

                    <TextField
                        variant="filled"
                        label="Ověření nového emailu"
                        helperText={errors.emailConfirm?.message}
                        error={!!errors.emailConfirm?.message}
                        {...register("emailConfirm")}
                    />

                </DialogContent>

                <Button sx={{ m: 1, float: "right" }} type="submit" size="large">{"Změnit"}</Button>
                <Button sx={{ m: 1, float: "right" }} color="error" size="large" onClick={close}>{"Zavřít"}</Button>

            </form>
        </Dialog>
    );
}