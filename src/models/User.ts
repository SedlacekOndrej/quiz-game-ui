import { Game } from "./Game"

export interface User {
    id: number
    createdDate: string
    username: string
    email: string
    level: number
    exp: number
    rightAnswers: number
    wrongAnswers: number
    percentage: number
    games: Game[]
}