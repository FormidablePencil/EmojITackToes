import { useSelector } from "react-redux"
import { Animations } from '../reducers/animationSettingReducer';

const usePlayOnPressAnimation = ({ sq0Ref, sq1Ref, sq2Ref }) => {
  const animationSetting = useSelector((state: any) => state.animationSetting)

  const executeAnimation = (whatSquarePressed) => {
    switch (animationSetting) {
      case Animations.fade_in:
        if (whatSquarePressed === 'sq0') sq0Ref.current.fadeIn()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.fadeIn()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.fadeIn()
        break
      case Animations.bounce:
        if (whatSquarePressed === 'sq0') sq0Ref.current.bounce()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.bounce()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.bounce()
        break
      case Animations.bounce_in:
        if (whatSquarePressed === 'sq0') sq0Ref.current.bounceIn()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.bounceIn()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.bounceIn()
        break
      case Animations.bounce_in_down:
        if (whatSquarePressed === 'sq0') sq0Ref.current.bounceInDown()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.bounceInDown()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.bounceInDown()
        break
      case Animations.bounce_in_left:
        if (whatSquarePressed === 'sq0') sq0Ref.current.bounceInLeft()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.bounceInLeft()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.bounceInLeft()
        break
      case Animations.bounce_in_up:
        if (whatSquarePressed === 'sq0') sq0Ref.current.bouncenUp()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.bouncenUp()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.bouncenUp()
        break
      case Animations.fadeIn_down_big:
        if (whatSquarePressed === 'sq0') sq0Ref.current.fadeInDownBig()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.fadeInDownBig()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.fadeInDownBig()
        break
      case Animations.fade_in:
        if (whatSquarePressed === 'sq0') sq0Ref.current.fadeIn()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.fadeIn()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.fadeIn()
        break
      case Animations.fade_in_down:
        if (whatSquarePressed === 'sq0') sq0Ref.current.fadeInDown()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.fadeInDown()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.fadeInDown()
        break
      case Animations.fade_in_left:
        if (whatSquarePressed === 'sq0') sq0Ref.current.fadeInLeft()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.fadeInLeft()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.fadeInLeft()
        break
      case Animations.fade_in_up:
        if (whatSquarePressed === 'sq0') sq0Ref.current.fadeInUp()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.fadeInUp()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.fadeInUp()
        break
      case Animations.fade_in_up_big:
        if (whatSquarePressed === 'sq0') sq0Ref.current.fadeInUpBig()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.fadeInUpBig()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.fadeInUpBig()
        break
      case Animations.pulse:
        if (whatSquarePressed === 'sq0') sq0Ref.current.pulse()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.pulse()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.pulse()
        break
      case Animations.rotate:
        if (whatSquarePressed === 'sq0') sq0Ref.current.rotate()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.rotate()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.rotate()
        break
      case Animations.rubber_band:
        if (whatSquarePressed === 'sq0') sq0Ref.current.rubberBand()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.rubberBand()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.rubberBand()
        break
      case Animations.swing:
        if (whatSquarePressed === 'sq0') sq0Ref.current.swing()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.swing()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.swing()
        break
      case Animations.zoom_in:
        if (whatSquarePressed === 'sq0') sq0Ref.current.zoomIn()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.zoomIn()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.zoomIn()
        break
      case Animations.zoom_in_down:
        if (whatSquarePressed === 'sq0') sq0Ref.current.zoomInDown()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.zoomInDown()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.zoomInDown()
        break
      default:
        if (whatSquarePressed === 'sq0') sq0Ref.current.pulse()
        else if (whatSquarePressed === 'sq1') sq1Ref.current.pulse()
        else if (whatSquarePressed === 'sq2') sq2Ref.current.pulse()
        break;
    }
    // esxecuteAnimation(sq1Ref)
  }
  return { executeAnimation }
}

export default usePlayOnPressAnimation