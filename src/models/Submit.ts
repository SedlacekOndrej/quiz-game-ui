import { Answers } from "./Answers";

export interface Submit {
    continent: string | undefined
    answers: Answers
    states: string[]
    gameTime: number
    gameType: string
}