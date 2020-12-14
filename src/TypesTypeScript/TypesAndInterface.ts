import { playerCharacterSettingsTypes } from "../reducers/playerCharacterSettingsReducer";

export interface ScoresTypes { p1: number; p2: number }
export enum Players { p1, p2 }
export enum ModalContents { GameOver, GameMenu, none, animationSettings }

export interface ScoresCompTypes {
  setSelectedPlayerToChooseCharacter
  selectedPlayerToChooseCharacter: Players
  controlledInputs: playerCharacterSettingsTypes
  score: ScoresTypes
  changingEmoji
}

export enum sqTypes {
  p1 = 'p1',
  p2 = 'p2',
  winnerP1 = 'winnerP1',
  winnerP2 = 'winnerP2'
}
export enum WinningDirection {
  leftToRightAcross = 'leftToRightAcross',
  rightToLeftAcross = 'rightToLeftAcross',
  horizontal = 'horizontal',
  vertical = 'vertical'
}

export interface GameBoardInterface { 0: gameBoardCol, 1: gameBoardCol, 2: gameBoardCol }
interface gameBoardCol { sq0: sqTypes, sq1: sqTypes, sq2: sqTypes }

export interface WinnerSqsTypes {
  playerWon: string | null,
  cols: {
    [index: number]: number
    filter: (col) => void
  },
  sqs: {
    [index: number]: string
  },
  direction: WinningDirection | null
}
export interface BoardTypes {
  wonInfo: WinnerSqsTypes,
  [index: string]: any
}

export interface ColCompTypes {
  wonInfo: WinnerSqsTypes
  [index: string]: any
}