import { WinningDirection, WinnerSqsTypes } from "../../TypesTypeScript/TypesAndInterface"

export const gameLogic = ({ gameboard }) => {
   const playerOne = ['p1', 'p2']
   let winnerSqs: WinnerSqsTypes

   for (let num = 0; num < playerOne.length; num++) {
      for (let col = 0; col < 3; col++) {
         if (gameboard[col].sq0 === playerOne[num] &&
            gameboard[col].sq1 === playerOne[num] &&
            gameboard[col].sq2 === playerOne[num]) {
            winnerSqs = { playerWon: `p${num + 1}`, cols: [col], sqs: ['sq0', 'sq1', 'sq2'], direction: WinningDirection.horizontal }
            return winnerSqs
         }
      }
      for (let square = 0; square < 3; square++) {
         if (
            gameboard[0][`sq${square}`] === playerOne[num] &&
            gameboard[1][`sq${square}`] === playerOne[num] &&
            gameboard[2][`sq${square}`] === playerOne[num]) {
            winnerSqs = { playerWon: `p${num + 1}`, cols: [0, 1, 2], sqs: [`sq${square}`], direction: WinningDirection.vertical }
            return winnerSqs
         }
      }
      if (
         gameboard[0].sq0 === playerOne[num] &&
         gameboard[1].sq1 === playerOne[num] &&
         gameboard[2].sq2 === playerOne[num]
      ) {
         winnerSqs = { playerWon: `p${num + 1}`, cols: [0, 1, 2], sqs: [], direction: WinningDirection.leftToRightAcross }
         return winnerSqs
      }
      if (
         gameboard[0].sq2 === playerOne[num] &&
         gameboard[1].sq1 === playerOne[num] &&
         gameboard[2].sq0 === playerOne[num]
      ) {
         winnerSqs = { playerWon: `p${num + 1}`, cols: [0, 1, 2], sqs: [], direction: WinningDirection.rightToLeftAcross }
         return winnerSqs
      }

   }
   return
}