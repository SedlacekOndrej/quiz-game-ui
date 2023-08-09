import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../models/Game";
import { User } from "../models/User";
import moment from "moment";

interface UserGamesHistoryProps {
    user: User | undefined
}

export default function UserGamesHistory(props: UserGamesHistoryProps) {
    const { user } = props;
    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const sortedGames = user?.games.slice().sort((gameA, gameB) => {
        if (gameA.score !== gameB.score) {
            return gameB.score - gameA.score;
        } else {
            return gameA.gameTime - gameB.gameTime;
        }
    });

    const resultsLink = (game: Game) => () => {
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

    const getContinentName = (continent: string) => {
        switch (continent) {
            case "EUROPE": return "Evropa";
            case "ASIA": return "Asie a Oceánie";
            case "AMERICA": return "Amerika";
            case "AFRICA": return "Afrika";
        }
    };

    return (
        <>
            <Button sx={{ mt: 3 }} type="button" variant="contained" size="large" onClick={handleOpen}>{"Historie her"}</Button>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ display: "flex", flexDirection: "column", alignItems: "center", fontWeight: "bold" }}>{"Historie her uživatele " + user?.username}</DialogTitle>

                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{"Datum"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Varianta"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Kontinent"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Skóre"}</TableCell>
                                <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Čas"}</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedGames?.map((game) => (
                                <TableRow key={game.id} sx={{ backgroundColor: "#e0e0e0" }}>
                                    <TableCell sx={{ fontSize: 16 }}>{moment(game.createdDate).format("DD. MM. YYYY HH:mm")}</TableCell>
                                    <TableCell sx={{ fontSize: 16 }} width={100} align="right">{game.gameType === "FLAGS" ? "Vlajky" : "Hlavní města"}</TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">{getContinentName(game.continentName)}</TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">{game.score}</TableCell>
                                    <TableCell sx={{ fontSize: 16 }} align="right">{game.gameTime + " s"}</TableCell>
                                    <TableCell sx={{ fontSize: 16, textDecoration: "underline", cursor: "pointer" }} align="right" onClick={resultsLink(game)}>{"Zobrazit detaily"}</TableCell>
                                </TableRow>
                            ))}
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