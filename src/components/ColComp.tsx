import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import usePlayWiningAnimation from '../useHooks/usePlayWiningAnimation'
import { sqTypes, ColCompTypes } from './../TypesTypeScript/TypesAndInterface'
import * as Animatable from 'react-native-animatable';
import { Col, Item, VerticalLine } from '../styles/stylesglobal'
import styled from 'styled-components';
import { Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import usePlayOnPressAnimation from '../useHooks/usePlayOnPressAnimation';


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

  usePlayWiningAnimation({ wonInfo, col, sq0Ref, sq1Ref, sq2Ref, winningSqare })
  const { executeAnimation } = usePlayOnPressAnimation({ sq0Ref, sq1Ref, sq2Ref })

  const handleOnPress = (whatSquarePressed, inWhatCol) => {
    handleOnPressSq(whatSquarePressed, inWhatCol)
    executeAnimation(whatSquarePressed)
  }
  // console.log(animationSetting);

  return (
    <Col>
      <Item onPress={() => handleOnPress('sq0', col)} style={{ tintColor: 'blue' }}>
        <StandardTextAnimated ref={sq0Ref} animation={"flipInX"}
          iterationCount={1}
          useNativeDriver={true}>
          {first ? playerCharacter[first === sqTypes.p1 ? 1 : 2] : null}
        </StandardTextAnimated>
      </Item>
      <VerticalLine theme={theme} />
      <Item onPress={() => handleOnPress('sq1', col)}>
        <StandardTextAnimated
          ref={sq1Ref}
          animation={"pulse"}
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
          animation={"pulse"}
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