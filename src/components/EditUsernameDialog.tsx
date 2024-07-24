import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";
import { QuizContext } from "../contexts/QuizContext";
import { UserContext } from "../contexts/UserContext";
import { fetchPut } from "../utils/Fetches";
import { urls } from "../utils/Urls";
import { EditSubmitData } from "../models/EditSubmitData";

const schema = yup.object({
    password: yup.string().required("Povinné pole"),
    username: yup.string().required("Povinné pole").min(4, "Musí obsahovat alespoň 4 znaky")
});

type Inputs = yup.InferType<typeof schema>;

interface EditUsernameDialogProps {
    readonly open: boolean
    readonly close: () => void
}

export default function EditUsernameDialog(props: EditUsernameDialogProps) {
    const { open, close } = props;
    const { user } = useContext(UserContext);
    const { setSeverity, setResponseMessage, setOpenSnackbar } = useContext(QuizContext);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (user) {
            const updatedData = {
                password: data.password,
                user: { ...user, username: data.username }
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
                setValue("username", "");
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

                <DialogTitle>{"Změnit uživatelské jméno"}</DialogTitle>

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
                        variant="filled"
                        label="Nové uživatelské jméno"
                        helperText={errors.username?.message}
                        error={!!errors.username?.message}
                        {...register("username")}
                    />

                </DialogContent>

                <Button sx={{ m: 1, float: "right" }} type="submit" size="large">{"Změnit"}</Button>
                <Button sx={{ m: 1, float: "right" }} color="error" size="large" onClick={close}>{"Zavřít"}</Button>

            </form>
        </Dialog>
    );
}