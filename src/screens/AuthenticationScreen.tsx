import React, { useState, createContext, useEffect } from 'react'
import { View, ImageBackground, Dimensions, KeyboardAvoidingView, Keyboard } from 'react-native'
import styled from 'styled-components'
import { Text } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import AuthsCompToRender from '../components/authComponents/AuthsCompToRender'

const SCREEN_HEIGHT = Dimensions.get("window").height

export const WhatCompRenderedContext = createContext()
export const NotifyUserWithMessageContext = createContext()

export enum AuthComps {
  EnterOptions,
  login = 'login',
  register = 'create'
}

export const DefaultNotifyUserWithMessage = {
  username: null,
  passsword: null,
  email: null,
}

const AuthenticationScreen = () => {
  const [notifyUserWithMessage, setNotifyUserWithMessage] = useState(DefaultNotifyUserWithMessage)
  const [keyboardPresent, setKeyboardPresent] = useState(false)
  const [whatComp, setWhatComp] = useState(AuthComps.EnterOptions)
  //if keyboard 


  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => { setKeyboardPresent(true) })
    Keyboard.addListener('keyboardDidHide', () => { setKeyboardPresent(false) })
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => { })
      Keyboard.removeListener('keyboardDidHide', () => { })
    }
  }, [Keyboard])

  return (
    <WhatCompRenderedContext.Provider value={{ whatComp, setWhatComp }}>
      <NotifyUserWithMessageContext.Provider value={{ notifyUserWithMessage, setNotifyUserWithMessage }}>
        <ImageBackgroundStyled height={SCREEN_HEIGHT} source={require('../assets/images/manyEmojis.jpg')}>
          <LinearGradentContainer colors={['rgba(132,171,255,.4)', '#5812FF']}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
              {!keyboardPresent &&
                <>
                  <TitleContainer>
                    <StyledTitle>Emoji Tack Toes</StyledTitle>
                  </TitleContainer>
                </>
              }
              <AuthsCompToRender
                keyboardPresent={keyboardPresent}
              />
            </KeyboardAvoidingView>
          </LinearGradentContainer>
        </ImageBackgroundStyled>
      </NotifyUserWithMessageContext.Provider>
    </WhatCompRenderedContext.Provider >
  )
}

const ImageBackgroundStyled = styled<any>(ImageBackground)`
  height: ${props => props.height}px;
  /* flex: 1; */
`;
const LinearGradentContainer = styled(LinearGradient)`
  flex: 1;
  justify-content:center;
`;
const StyledTitle = styled(Text)`
  text-align: center;
  font-size: 30px;
  font-family: LemonadaMedium;
  color: white;
`
const TitleContainer = styled(View)`
  flex: .8;
  justify-content:center;
`;

export default AuthenticationScreen
