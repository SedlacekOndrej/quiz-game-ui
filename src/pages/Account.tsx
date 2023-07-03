import { Card, CardContent, CardHeader, Container, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import HomeNavigation from "../components/HomeNavigation";
import { UserContext } from "../contexts/UserContext";
import { useQuery } from "react-query";
import { User } from "../models/User";
import { fetchGet } from "../utils/Fetches";
import { urls } from "../utils/urls";
import AccessDenied from "../components/AccessDenied";

export default function Account() {
    const { user } = useContext(UserContext);

    const { data } = useQuery<User>(["user"], ({ signal }) => fetchGet(urls.user + user?.id, signal));

    return (
        <>
            {user !== null ? <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography sx={{ m: 3, fontWeight: "bold", fontSize: 25 }}>{"Informace o účtu"}</Typography>

                <Card sx={{ m: 2, border: 1 }}>
                    <CardHeader
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#1976d2", color: "white" }}
                        title={data?.username}
                    />
                    <CardContent sx={{ backgroundColor: "#e0e0e0" }}>
                        <Grid container justifyContent="center" spacing={1} sx={{ maxWidth: 600 }}>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: "bold" }}>{"Úroveň:"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data?.level}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: "bold" }}>{"Zkušenosti:"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data?.exp}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: "bold" }}>{"Počet správných odpovědí:"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data?.rightAnswers}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: "bold" }}>{"Počet špatných odpovědí:"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data?.wrongAnswers}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: "bold" }}>{"Procento úspěšnosti:"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data?.percentage.toFixed(2) + "%"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: "bold" }}>{"Email:"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data?.email}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <HomeNavigation />
            </Container>
                :
                <AccessDenied />}
        </>
    );
}