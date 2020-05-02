import { SymbolChoicesTypes } from "../../reducers/symbolChoicesReducer";

export interface ScoresTypes { p1: number; p2: number }
export enum Players { p1, p2 }
export enum ModalContents { GameOver, GameMenu, none }

export interface ScoresCompTypes {
  setSelectedPlayerToChooseCharacter
  selectedPlayerToChooseCharacter: Players
  controlledInputs: SymbolChoicesTypes
  setControlledInputs
  score: ScoresTypes
  changingEmoji
  setShowEmojiSelector
  setChangingEmoji
}
