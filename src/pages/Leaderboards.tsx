import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { User } from "../models/User";
import { useQuery } from "react-query";
import { fetchGet } from "../utils/Fetches";
import HomeNavigation from "../components/HomeNavigation";
import { urls } from "../utils/urls";
import AllGamesHistory from "../components/AllGamesHistory";

export default function Leaderboards() {

  const { data: users = [] } = useQuery<User[]>(["users"], ({ signal }) => fetchGet(urls.leaderboards, signal));

  return (
    <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography sx={{ m: 3, fontWeight: "bold", fontSize: 25 }}>{"Žebříček nejlepších"}</Typography>

      {users.length > 0 ? <TableContainer sx={{ m: 2, border: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{"Uživatelské jméno"}</TableCell>
              <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Úroveň"}</TableCell>
              <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Zkušenosti"}</TableCell>
              <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Správné odpovědi"}</TableCell>
              <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Špatné odpovědi"}</TableCell>
              <TableCell sx={{ color: "white", fontSize: 20, fontWeight: "bold" }} align="right">{"Úspěšnost"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} sx={{ backgroundColor: "#e0e0e0" }}>
                <TableCell sx={{ fontSize: 16 }}>{user.username}</TableCell>
                <TableCell sx={{ fontSize: 16 }} align="right">{user.level}</TableCell>
                <TableCell sx={{ fontSize: 16 }} align="right">{user.exp}</TableCell>
                <TableCell sx={{ fontSize: 16 }} align="right">{user.rightAnswers}</TableCell>
                <TableCell sx={{ fontSize: 16 }} align="right">{user.wrongAnswers}</TableCell>
                <TableCell sx={{ fontSize: 16 }} align="right">{user.percentage.toFixed(2) + "%"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        :
        <Typography sx={{ fontSize: 20 }}>{"Nebyl nalezen žádný uživatel"}</Typography>}

      <AllGamesHistory />

      <HomeNavigation />
    </Container>
  );
}