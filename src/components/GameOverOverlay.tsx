import React, { useEffect, useRef, useState } from 'react'
import { ModalContents } from "./../TypesTypeScript/TypesAndInterface"
import { StyleSheet, View } from 'react-native'
import { TouchableRipple, withTheme, Text } from 'react-native-paper'
import styled from 'styled-components'
import { ReadyUpTxt } from '../reusables/ReadyUpTxt'
import useCheckIfOnlineGame from '../hooks/useCheckIfOnlineGame'
import { useDispatch, useSelector } from 'react-redux'
import socketIoCommands from '../socket.io/socketIoCommandCenter'
import { rootT } from '../store'
import { CHAR_ANIM_OUT_TRUE, READY_UP } from '../actions/types'
import * as Animatable from 'react-native-animatable';
import { reusableStyles } from '../styles/stylesglobal'

const GameOverOverlay = ({ showInModal, setShowInModal, gameOver, startGame, theme }) => {
  const isOnlineGame = useCheckIfOnlineGame()
  const dispatch = useDispatch()
  const lobbyId = useSelector((state: rootT) => state.multiplayer.socketIoData.lobbyId)
  const animatedRef = useRef(null)
  const [display, setDisplay] = useState(false)

  enum Action {
    goToSelectCharacter,
    readyUp
  }
  const onPressHandler = async (action) => {
    dispatch({ type: CHAR_ANIM_OUT_TRUE })
    setTimeout(() => {
      if (action === Action.goToSelectCharacter) {
        setShowInModal(ModalContents.GameMenu)
      } else if (action === Action.readyUp) {
        if (isOnlineGame) {
          socketIoCommands.readyUp(lobbyId)
          dispatch({ type: READY_UP })
        } else {
          animatedRef.current.fadeOutUpBig().then(() => setDisplay(false))
          startGame()
        }
      }
    }, 100);
  }

  useEffect(() => {
    if (isOnlineGame && gameOver && showInModal === ModalContents.GameOver) {
      setDisplay(true)
      animatedRef.current.fadeInDownBig()
    } else if (isOnlineGame && !gameOver && showInModal !== ModalContents.GameOver) {
      animatedRef.current.fadeOutUpBig().then(() => setTimeout(() => setDisplay(false), 500))
    }

    if (!isOnlineGame && gameOver) {
      setTimeout(() => {
        setDisplay(true)
        animatedRef.current.fadeInDownBig()
      }, 500);
    } else if (!isOnlineGame && !gameOver) {
      setDisplay(false)
    }
  }, [gameOver, showInModal])

  return (
    <Animatable.View
      useNativeDriver={true}
      style={{ ...styles.containerAligning, display: display ? 'flex' : 'none' }} ref={animatedRef}>
      <JustifyCol>
        <BtnContainer>
          <TouchableRippleStyled
            theme={theme}
            onPress={() => onPressHandler(Action.goToSelectCharacter)}
          >
            <View style={{ flexDirection: 'column' }}>
              <TextStyled style={reusableStyles.smText}>Select</TextStyled>
              <TextStyled style={reusableStyles.smText}>character</TextStyled>
            </View>
          </TouchableRippleStyled>
          <TouchableRippleStyled
            theme={theme}
            onPress={() => onPressHandler(Action.readyUp)}
          >
            <TextStyled>
              <ReadyUpTxt />
            </TextStyled>
          </TouchableRippleStyled>
        </BtnContainer>
      </JustifyCol>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  containerAligning: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})
const BtnContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
  background-color: rgba(0,0,0,.3);
  padding: 25px 0px;
`;
const TouchableRippleStyled = styled(TouchableRipple)`
  background-color: ${props => {
    let color = props.theme.colors.primary
    const transparentColor = color.replace("1.0)", ".9)");
    return transparentColor
  }};
  border-radius: 10px;
  padding: 5px 20px;
  justify-content: center;
`;
const TextStyled = styled(Text)`
  font-size: 15px;
  color: white;
  text-align: center;
`
const JustifyCol = styled(View)`
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 30%;
`


export default withTheme(GameOverOverlay)
