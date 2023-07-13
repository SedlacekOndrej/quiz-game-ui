import { Answers } from "./Answers";

export interface Submit {
    continent: string | undefined
    answers: Answers
    questions: string[]
    gameTime: number
    gameType: string
}