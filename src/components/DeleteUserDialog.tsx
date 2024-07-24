import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { fetchDelete } from "../utils/Fetches";
import { urls } from "../utils/Urls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { QuizContext } from "../contexts/QuizContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    password: yup.string().required("Povinné pole"),
});

type Inputs = yup.InferType<typeof schema>;

interface DeleteUserProps {
    readonly open: boolean
    readonly close: () => void
}

export default function DeleteUserDialog(props: DeleteUserProps) {
    const { open, close } = props;
    const { user, setUser } = useContext(UserContext);
    const { setSeverity, setResponseMessage, setOpenSnackbar } = useContext(QuizContext);
    const navigate = useNavigate();

    const { register, handleSubmit, getValues, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = () => mutate();

    const { mutate } = useMutation(() => fetchDelete(urls.user + user?.id + "?password=" + getValues("password")),
    {
        onSuccess: () => {
            setSeverity("success");
            setResponseMessage("Uživatel " + user?.username + " byl úspěšně smazán");
            setOpenSnackbar(true);
            setUser(null);
            navigate("/");
            close();
        },
        onError: (error: string) => {
            setSeverity("error");
            setResponseMessage(error);
            setOpenSnackbar(true);
        }
    });

    return (
        <Dialog open={open} onClose={close}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <DialogTitle>{"Smazat účet"}</DialogTitle>

                <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography>{"Jste si jistí, že chcete smazat tento účet? Tato akce je nevratná"}</Typography>

                    <TextField
                        sx={{ m: 2 }}
                        variant="filled"
                        label="Heslo"
                        helperText={errors.password?.message}
                        error={!!errors.password?.message}
                        type="password"
                        {...register("password")}
                    />
                </DialogContent>

                <Button sx={{ m: 1, float: "right" }} type="submit" color="error">{"Smazat"}</Button>
                <Button sx={{ m: 1, float: "right" }} onClick={close}>{"Zavřít"}</Button>

            </form>
        </Dialog>
    );
}