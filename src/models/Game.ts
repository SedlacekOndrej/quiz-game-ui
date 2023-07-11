import { User } from "./User"

export interface Game {
    id: number
    createdDate: string
    gameType: string
    score: number
    gameTime: number
    questions: string[]
    answers: string[]
    succeededQuestions: string[]
    failedQuestions: string[]
    rightAnswers: string[]
    user: User
}