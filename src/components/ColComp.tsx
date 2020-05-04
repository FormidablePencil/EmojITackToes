import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import playWiningAnimation from '../useHooks/playWiningAnimation'
import { sqTypes, ColCompTypes } from './../TypesTypeScript/TypesAndInterface'
import * as Animatable from 'react-native-animatable';
import { Col, Item, VerticalLine } from '../styles/stylesglobal'
import styled from 'styled-components';
import { Text } from 'react-native';
import { useTheme } from 'react-native-paper';


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
  const { playerCharacter } = useSelector((state: any) => state.playerCharacterSettings)
  const sq0Ref = useRef(null)
  const sq1Ref = useRef(null)
  const sq2Ref = useRef(null)
  const theme = useTheme()

  playWiningAnimation({ wonInfo, col, sq0Ref, sq1Ref, sq2Ref, winningSqare })


  const handleOnPress = (whatSquarePressed, inWhatCol) => {
    handleOnPressSq(whatSquarePressed, inWhatCol)
    if (whatSquarePressed === 'sq0') sq0Ref.current.rotate()
    else if (whatSquarePressed === 'sq1') sq1Ref.current.rotate()
    else if (whatSquarePressed === 'sq2') sq2Ref.current.rotate()
  }

  return (
    <Col>
      <Item onPress={() => handleOnPress('sq0', col)} style={{ tintColor: 'blue' }}>
        <StandardTextAnimated ref={sq0Ref} animation={"rotate"}
          iterationCount={1}
          useNativeDriver={true}>
          {first ? playerCharacter[first === sqTypes.p1 ? 1 : 2] : null}
        </StandardTextAnimated>
      </Item>
      <VerticalLine theme={theme} />
      <Item onPress={() => handleOnPress('sq1', col)}>
        <StandardTextAnimated
          ref={sq1Ref}
          animation={"rotate"}
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
          animation={"rotate"}
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