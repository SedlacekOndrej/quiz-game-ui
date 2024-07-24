import { AccountCircle, Edit, Home, Leaderboard, Login, Logout, MenuBook, MenuSharp, Person, PersonAdd } from "@mui/icons-material";
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";
import { UserContext } from "../contexts/UserContext";
import CustomSnackbar from "./CustomSnackbar";

interface NavBarProps {
    readonly title: string
}

export default function NavBar(props: NavBarProps) {
    const { title } = props;
    const { user, setUser } = useContext(UserContext);
    const { setOpenSnackbar } = useContext(QuizContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNavigate = (path: string) => () => {
        setOpenSnackbar(false);
        navigate("/" + path);
    };

    const logout = () => {
        setOpenSnackbar(false);
        setUser(null);
        navigate("/");
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const handleCloseMenu = () => setAnchorEl(null);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };

    const list = () => (
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleNavigate("")}>
                        <ListItemIcon>
                            <Home color="info" />
                        </ListItemIcon>
                        <ListItemText primary={"Hlavní stránka"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleNavigate("leaderboards")}>
                        <ListItemIcon>
                            <Leaderboard color="warning" />
                        </ListItemIcon>
                        <ListItemText primary={"Žebříček"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleNavigate("encyclopedia")}>
                        <ListItemIcon>
                            <MenuBook color="success" />
                        </ListItemIcon>
                        <ListItemText primary={"Encyklopedie"} />
                    </ListItemButton>
                </ListItem>
            </List>

            {!user &&
                <Fragment>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleNavigate("login")}>
                                <ListItemIcon>
                                    <Login color="success" />
                                </ListItemIcon>
                                <ListItemText primary={"Přihlášení"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleNavigate("registration")}>
                                <ListItemIcon>
                                    <PersonAdd color="success" />
                                </ListItemIcon>
                                <ListItemText primary={"Registrace"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Fragment>
            }
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
                        <Typography sx={{ flexGrow: 1 }} variant="h6">{title}</Typography>
                        {user &&
                            <Fragment>
                                <IconButton size="large" onClick={handleOpenMenu} color="inherit">
                                    <AccountCircle />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} keepMounted>
                                    <MenuItem onClick={handleNavigate("account")}><Person sx={{ mr: 1, mb: 1 }} color="success" />{"Můj profil"}</MenuItem>
                                    <MenuItem onClick={handleNavigate("account/edit")}><Edit sx={{ mr: 1, mb: 1 }} color="info" />{"Upravit profil"}</MenuItem>
                                    <MenuItem onClick={logout}><Logout sx={{ mr: 1 }} color="error" />{"Odhlásit"}</MenuItem>
                                </Menu>
                            </Fragment>
                        }
                    </Toolbar>
                </AppBar>
            </Box>

            <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer(false)}>{list()}</Drawer>

            <CustomSnackbar />
        </>
    );
}