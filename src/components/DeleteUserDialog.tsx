import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
    password: yup.string().required("Povinné pole"),
});

type Inputs = yup.InferType<typeof schema>;

interface DeleteUserProps {
    open: boolean
    close: () => void
}

export default function DeleteUserDialog(props: DeleteUserProps) {
    const { open, close } = props;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
        setValue("password", "");
        close();
    }

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
                        {...register("password")}
                    />
                </DialogContent>

                <Button onClick={close}>{"Zavřít"}</Button>
                <Button type="submit" color="error">{"Smazat"}</Button>

            </form>
        </Dialog>
    );
}