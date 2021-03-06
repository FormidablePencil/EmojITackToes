import { useEffect } from "react"
import { WinningDirection } from "../TypesTypeScript/TypesAndInterface"

const usePlayWiningAnimation = ({ wonInfo, col, sq0Ref, sq1Ref, sq2Ref, winningSqare, characterAnimateOut }) => {
  useEffect(() => {
    let iterationId
    let iterationId2
    let iterationId3
    let iterationId4
    if (wonInfo.direction === WinningDirection.leftToRightAcross) {
      if (col === 0) {
        iterationId4 = setInterval(() => {
          sq0Ref.current.bounce(2000)
        }, 2000)
      }
      if (col === 1) {
        iterationId4 = setInterval(() => {
          sq1Ref.current.bounce(2000)
        }, 2000)
      }
      if (col === 2) {
        iterationId4 = setInterval(() => {
          sq2Ref.current.bounce(2000)
        }, 2000)
      }
    } else if (wonInfo.direction === WinningDirection.rightToLeftAcross) {

      if (col === 2) {
        iterationId4 = setInterval(() => {
          sq0Ref.current.bounce(2000)
        }, 2000)
      }
      if (col === 1) {
        iterationId4 = setInterval(() => {
          sq1Ref.current.bounce(2000)
        }, 2000)
      }
      if (col === 0) {
        iterationId4 = setInterval(() => {
          sq2Ref.current.bounce(2000)
        }, 2000)
      }
    } else {
      for (let i = 0; i < 3; i++) {
        if (wonInfo.cols.filter(item => item === col)[0] !== undefined) {
          if (winningSqare[i] === `sq0`) {
            iterationId = setInterval(() => {
              sq0Ref.current.bounce(2000)
            }, 2000)
          }
          if (winningSqare[i] === `sq1`) {
            iterationId2 = setInterval(() => {
              sq1Ref.current.bounce(2000)
            }, 2000)
          }
          if (winningSqare[i] === `sq2`) {
            iterationId3 = setInterval(() => {
              sq2Ref.current.bounce(2000)
            }, 2000)
          }
        }
      }
    }

    const clearEveryAnim = () => {
      clearInterval(iterationId)
      clearInterval(iterationId2)
      clearInterval(iterationId3)
      clearInterval(iterationId4)
    }
    // if (characterAnimateOut) {
    //   console.log('wtff')
    //   clearEveryAnim()
    // }

    return () => {
      clearEveryAnim()
    }
  }, [winningSqare])

}

export default usePlayWiningAnimation