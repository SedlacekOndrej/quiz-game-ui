import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";
import { fetchPut } from "../utils/Fetches";
import { urls } from "../utils/urls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { QuizContext } from "../contexts/QuizContext";
import { EditSubmitData } from "../models/EditSubmitData";

const schema = yup.object({
    password: yup.string().required("Povinné pole"),
    newPassword: yup.string().required("Povinné pole").min(6, "Musí obsahovat alespoň 6 znaků"),
    newPasswordConfirm: yup.string().required("Povinné pole").oneOf([yup.ref("newPassword")], "Hesla se neshodují")
});

type Inputs = yup.InferType<typeof schema>;

interface EditPasswordDialogProps {
    open: boolean
    close: () => void
}

export default function EditPasswordDialog(props: EditPasswordDialogProps) {
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
                user: { ...user, password: data.newPassword }
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
                setValue("newPassword", "");
                setValue("newPasswordConfirm", "");
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

                <DialogTitle>{"Změnit heslo"}</DialogTitle>

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
                        label="Nové heslo"
                        helperText={errors.newPassword?.message}
                        error={!!errors.newPassword?.message}
                        type="password"
                        {...register("newPassword")}
                    />

                    <TextField
                        variant="filled"
                        label="Ověření nového hesla"
                        helperText={errors.newPasswordConfirm?.message}
                        error={!!errors.newPasswordConfirm?.message}
                        type="password"
                        {...register("newPasswordConfirm")}
                    />

                </DialogContent>

                <Button sx={{ m: 1, float: "right" }} type="submit" size="large">{"Změnit"}</Button>
                <Button sx={{ m: 1, float: "right" }} color="error" size="large" onClick={close}>{"Zavřít"}</Button>

            </form>
        </Dialog>
    );
}