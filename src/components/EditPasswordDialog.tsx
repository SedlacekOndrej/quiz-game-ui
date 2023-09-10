import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

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

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
        setValue("password", "");
        setValue("newPassword", "");
        setValue("newPasswordConfirm", "");
        close();
    }

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
                <Button sx={{ m: 1, float: "right" }} type="button" color="error" size="large" onClick={close}>{"Zavřít"}</Button>

            </form>
        </Dialog>
    );
}