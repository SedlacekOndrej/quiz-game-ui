export interface Game {
    id: number
    createdDate: string
    continent: string
    gameType: string
    score: number
    gameTime: number
    questions: string[]
    possibleAnswers: string[]
    answers: string[]
    rightAnswers: string[]
}