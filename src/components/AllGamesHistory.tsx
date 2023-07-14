import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { GameHistory } from "../models/GameHistory";
import { fetchGet } from "../utils/Fetches";
import { urls } from "../utils/urls";

export default function AllGamesHistory() {
    const [open, setOpen] = useState<boolean>(false);

    const { data: games = [] } = useQuery<GameHistory[]>(["game"], ({ signal }) => fetchGet(urls.history, signal));

    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const resultsLink = (game: GameHistory) => () => {
        navigate("/results", {
            state: {
                score: game.score,
                continent: game.continentName,
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

            <Dialog open={open} onClose={handleClose} fullScreen>
                <DialogTitle sx={{ display: "flex", flexDirection: "column", alignItems: "center", fontWeight: "bold" }}>{"Historie her"}</DialogTitle>

                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{"Datum"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Uživatel"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Varianta"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Skóre"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Čas"}</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array(games.map((game) => (
                                <TableRow key={game.id} sx={{ backgroundColor: "#e0e0e0" }}>
                                    <TableCell sx={{ fontSize: 16 }}>{game.createdDate}</TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">{game.username}</TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">{game.gameType === "FLAGS" ? "Vlajky" : "Hlavní města"}</TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">{game.score}</TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">{game.gameTime + " s"}</TableCell>
                                    <TableCell sx={{ fontSize: 16, textDecoration: "underline", cursor: "pointer" }} align="right" onClick={resultsLink(game)}>{"Zobrazit detaily"}</TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </DialogContent>

                <DialogActions>
                    <Button type="button" size="large" onClick={handleClose}>{"Zavřít"}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}