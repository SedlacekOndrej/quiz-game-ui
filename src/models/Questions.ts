import { GameType } from "./GameType"

export interface Questions {
    questions: string[]
    possibleAnswers: string[]
    gameType: GameType
}