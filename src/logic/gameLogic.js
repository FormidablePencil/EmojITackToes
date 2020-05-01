export const gameLogic = (sq) => {
   const playerOne = [true, false]
   for (let num = 0; num < playerOne.length; num++) {
      console.log(num, 'numnum')
      if (
         sq[0].sq0 === playerOne[num] &&
         sq[0].sq1 === playerOne[num] &&
         sq[0].sq2 === playerOne[num]
         ||
         sq[1].sq0 === playerOne[num] &&
         sq[1].sq1 === playerOne[num] &&
         sq[1].sq2 === playerOne[num]
         ||
         sq[2].sq0 === playerOne[num] &&
         sq[2].sq1 === playerOne[num] &&
         sq[2].sq2 === playerOne[num]
         ||
         sq[0].sq0 === playerOne[num] &&
         sq[1].sq0 === playerOne[num] &&
         sq[2].sq0 === playerOne[num]
         ||
         sq[0].sq1 === playerOne[num] &&
         sq[1].sq1 === playerOne[num] &&
         sq[2].sq1 === playerOne[num]
         ||
         sq[0].sq2 === playerOne[num] &&
         sq[1].sq2 === playerOne[num] &&
         sq[2].sq2 === playerOne[num]
         ||
         sq[0].sq0 === playerOne[num] &&
         sq[1].sq1 === playerOne[num] &&
         sq[2].sq2 === playerOne[num]
         ||
         sq[0].sq2 === playerOne[num] &&
         sq[1].sq1 === playerOne[num] &&
         sq[2].sq0 === playerOne[num]
      ) {
         if (playerOne[num] === true) return 'p1'
         else return 'p2'
      }
   } return null
}
