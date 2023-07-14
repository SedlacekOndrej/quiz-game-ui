import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Game } from "../models/Game";
import { User } from "../models/User";
import { fetchGet } from "../utils/Fetches";
import { urls } from "../utils/urls";

interface UserGamesHistoryProps {
    user: User
}

export default function UserGamesHistory(props: UserGamesHistoryProps) {
    const { user } = props;
    const [open, setOpen] = useState<boolean>(false);

    const { data: games = [] } = useQuery<Game[]>(["game"], ({ signal }) => fetchGet(urls.history + `/${user.id}`, signal));

    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const resultsLink = (game: Game) => () => {
        navigate("/results", {
            state: {
                score: game.score,
                continent: game.continent,
                secondsLeft: game.gameTime,
                gameType: game.gameType,
                questions: game.questions,
                possibleAnswers: game.possibleAnswers,
                userAnswers: game.answers,
                rightAnswers: game.rightAnswers
            }
        });
    };

    return (
        <>
            <Button sx={{ mt: 3 }} type="button" variant="contained" onClick={handleOpen}>{"Historie her"}</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Historie her uživatele " + user.username}</DialogTitle>

                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{"Datum"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Varianta"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Skóre"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Čas"}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {games.map((game) => (
                                <TableRow key={user.id} sx={{ backgroundColor: "#e0e0e0" }}>
                                    <TableCell sx={{ fontSize: 16 }}>{game.createdDate}</TableCell>
                                    <TableCell sx={{ fontSize: 16, textDecoration: "underline", cursor: "pointer" }} align="right" onClick={resultsLink(game)}>{game.gameType}</TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">{game.score}</TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">{game.gameTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>

                <DialogActions>
                    <Button type="button" onClick={handleClose}>{"Zavřít"}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}