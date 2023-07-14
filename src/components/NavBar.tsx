import { AccountCircle, Home, Leaderboard, Login, Logout, MenuSharp, Person, PersonAdd } from "@mui/icons-material";
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";
import { UserContext } from "../contexts/UserContext";

interface NavBarProps {
    title: string
}

export default function NavBar(props: NavBarProps) {
    const { title } = props;
    const { user, setUser } = useContext(UserContext);
    const { setOpenSnackbar } = useContext(QuizContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const navigate = useNavigate();

    const registrationLink = () => {
        setOpenSnackbar(false);
        navigate("/registration");
    };

    const loginLink = () => {
        setOpenSnackbar(false);
        navigate("/login");
    };

    const leaderboardsLink = () => {
        setOpenSnackbar(false);
        navigate("/leaderboards");
    };

    const accountLink = () => {
        setOpenSnackbar(false);
        navigate("/account");
    };

    const homepageLink = () => {
        setOpenSnackbar(false);
        navigate("/");
    };

    const logout = () => {
        setOpenSnackbar(false);
        setUser(null);
        navigate("/");
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setOpenDrawer(open);
            };

    const list = () => (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={homepageLink}>
                        <ListItemIcon>
                            <Home color="info" />
                        </ListItemIcon>
                        <ListItemText primary={"Hlavní stránka"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={leaderboardsLink}>
                        <ListItemIcon>
                            <Leaderboard color="warning" />
                        </ListItemIcon>
                        <ListItemText primary={"Žebříček"} />
                    </ListItemButton>
                </ListItem>
            </List>
            {!user && <Fragment>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={loginLink}>
                            <ListItemIcon>
                                <Login color="success" />
                            </ListItemIcon>
                            <ListItemText primary={"Přihlášení"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={registrationLink}>
                            <ListItemIcon>
                                <PersonAdd color="success" />
                            </ListItemIcon>
                            <ListItemText primary={"Registrace"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Fragment>}
        </Box>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton sx={{ mr: 2 }} size="large" edge="start" color="inherit" onClick={toggleDrawer(true)}>
                            <MenuSharp />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{title}</Typography>
                        {user && (
                            <Fragment>
                                <IconButton size="large" onClick={handleMenu} color="inherit">
                                    <AccountCircle />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
                                    <MenuItem onClick={accountLink}><Person sx={{ mr: 1 }} color="info" />{"Můj profil"}</MenuItem>
                                    <MenuItem onClick={logout}><Logout sx={{ mr: 1 }} color="error" />{"Odhlásit"}</MenuItem>
                                </Menu>
                            </Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>

            <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer(false)}>{list()}</Drawer>
        </>
    );
}