import { Button, Container } from "@mui/material";
import { useState } from "react";
import EditEmailDialog from "../components/EditEmailDialog";
import EditPasswordDialog from "../components/EditPasswordDialog";
import EditUsernameDialog from "../components/EditUsernameDialog";
import HomeNavigation from "../components/HomeNavigation";
import NavBar from "../components/NavBar";
import DeleteUserDialog from "../components/DeleteUserDialog";

export default function EditAccount() {
    const [openEditUsername, setOpenEditUsername] = useState<boolean>(false);
    const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);
    const [openEditEmail, setOpenEditEmail] = useState<boolean>(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

    const handleOpenEditUsername = () => setOpenEditUsername(true);

    const handleCloseEditUsername = () => setOpenEditUsername(false);

    const handleOpenEditPassword = () => setOpenEditPassword(true);

    const handleCloseEditPassword = () => setOpenEditPassword(false);

    const handleOpenEditEmail = () => setOpenEditEmail(true);

    const handleCloseEditEmail = () => setOpenEditEmail(false);

    const handleOpenConfirm = () => setOpenConfirmDelete(true);

    const handleCloseConfirm = () => setOpenConfirmDelete(false);

    return (
        <>
            <NavBar title="Upravit profil" />

            <Container sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>

                <Button sx={{ mb: 2 }} size="large" onClick={handleOpenEditUsername}>{"Změnit uživatelské jméno"}</Button>
                <Button sx={{ mb: 2 }} size="large" onClick={handleOpenEditPassword}>{"Změnit heslo"}</Button>
                <Button sx={{ mb: 2 }} size="large" onClick={handleOpenEditEmail}>{"Změnit email"}</Button>
                <Button sx={{ mb: 2 }} size="large" color="error" onClick={handleOpenConfirm}>{"Smazat účet"}</Button>

                <HomeNavigation />
            </Container>

            <EditUsernameDialog open={openEditUsername} close={handleCloseEditUsername} />

            <EditPasswordDialog open={openEditPassword} close={handleCloseEditPassword} />

            <EditEmailDialog open={openEditEmail} close={handleCloseEditEmail} />

            <DeleteUserDialog open={openConfirmDelete} close={handleCloseConfirm} />
        </>
    );
}