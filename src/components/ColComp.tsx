import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import usePlayWiningAnimation from '../useHooks/usePlayWiningAnimation'
import { sqTypes, ColCompTypes } from './../TypesTypeScript/TypesAndInterface'
import * as Animatable from 'react-native-animatable';
import { Col, Item, VerticalLine } from '../styles/stylesglobal'
import styled from 'styled-components';
import { Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import usePlayOnPressAnimation from '../useHooks/usePlayOnPressAnimation';
import { rootT } from '../store';
import usePrevious from '../hooks/usePrevious';
import { CHAR_ANIM_OUT_FALSE, START_NEW_GAME } from '../actions/types';


const ColComp = ({
  first,
  second,
  third,
  handleOnPressSq,
  col,
  winningSqare,
  wonInfo,
  gameOver
}: ColCompTypes) => {
  const { playerCharacter } = useSelector((state: rootT) => state.playerCharacterSettings)
  const characterAnimateOut = useSelector((state: rootT) => state.misc.characterAnimateOut)
  const sq0Ref = useRef(null)
  const sq1Ref = useRef(null)
  const sq2Ref = useRef(null)
  const prevFirstSq = usePrevious(first)
  const prevSecondSq = usePrevious(second)
  const prevThirdSq = usePrevious(third)
  const theme = useTheme()
  const dispatch = useDispatch()

  usePlayWiningAnimation({ wonInfo, col, sq0Ref, sq1Ref, sq2Ref, winningSqare, characterAnimateOut })
  const { executeAnimation } = usePlayOnPressAnimation({ sq0Ref, sq1Ref, sq2Ref })

  const handleOnPress = (whatSquarePressed, inWhatCol) => {
    handleOnPressSq(whatSquarePressed, inWhatCol)
  }

  useEffect(() => {
    if (characterAnimateOut) {
      sq0Ref.current.zoomOut()
      sq1Ref.current.zoomOut()
      sq2Ref.current.zoomOut()
      dispatch({ type: CHAR_ANIM_OUT_FALSE })
      setTimeout(() => {
        dispatch({ type: START_NEW_GAME })
      }, 1000);
    }
  }, [characterAnimateOut])

  useEffect(() => {
    let sqAnimExecute
    if (first !== prevFirstSq) sqAnimExecute = 'sq0'
    if (second !== prevSecondSq) sqAnimExecute = 'sq1'
    if (third !== prevThirdSq) sqAnimExecute = 'sq2'
    executeAnimation(sqAnimExecute)
  }, [first, second, third,])

  return (
    <Col>
      <Item onPress={() => handleOnPress('sq0', col)} /* style={{ tintColor: 'blue' }} */>
        <StandardTextAnimated
          ref={sq0Ref}
          iterationCount={1}
          useNativeDriver={true}>
          {first ? playerCharacter[first === sqTypes.p1 ? 1 : 2] : null}
        </StandardTextAnimated>
      </Item>
      <VerticalLine theme={theme} />
      <Item onPress={() => handleOnPress('sq1', col)}>
        <StandardTextAnimated
          ref={sq1Ref}
          iterationCount={1}
          useNativeDriver={true}
        >
          {second ? playerCharacter[second === sqTypes.p1 ? 1 : 2] : null}
        </StandardTextAnimated>
      </Item>
      <VerticalLine theme={theme} />
      <Item onPress={() => handleOnPress('sq2', col)}>
        <StandardTextAnimated
          ref={sq2Ref}
          iterationCount={1}
          useNativeDriver={true}
        >
          {third ? playerCharacter[third === sqTypes.p1 ? 1 : 2] : null}
        </StandardTextAnimated>
      </Item>
    </Col>
  )
}


const StandardText = styled(Text)`
  font-size: 45px;
`;

const StandardTextAnimated = Animatable.createAnimatableComponent(StandardText)


export default ColComp