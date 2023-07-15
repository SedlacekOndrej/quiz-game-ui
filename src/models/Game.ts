export interface Game {
    id: number
    createdDate: string
    continentName: string
    gameType: string
    score: number
    gameTime: number
    questions: string[]
    possibleAnswers: string[]
    answers: string[]
    rightAnswers: string[]
}