import React, { useContext } from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper'
import styled from 'styled-components'
import { WhatCompRenderedContext, AuthComps, DefaultNotifyUserWithMessage, NotifyUserWithMessageContext } from '../../screens/AuthenticationScreen'


export const LoginAndRegisterComp = ({ controlledInputs, setControlledInputs }) => {
  const { notifyUserWithMessage, setNotifyUserWithMessage } = useContext(NotifyUserWithMessageContext)
  const { whatComp } = useContext(WhatCompRenderedContext)

  const handleTextInputs = (whatInput, value) => {
    setNotifyUserWithMessage(DefaultNotifyUserWithMessage)
    setControlledInputs({ ...controlledInputs, [whatInput]: value })
  }
  return (
    <Container>
      <TextInputStyled
        style={{ placeholderTextColor: 'white' }}
        onChangeText={(text) => handleTextInputs('username', text)}
        placeholder='Username'
        error={notifyUserWithMessage.username || notifyUserWithMessage.general}
        value={controlledInputs.username}
      />
      <TextInputStyled
        onChangeText={(text) => handleTextInputs('password', text)}
        placeholder='Password'
        error={notifyUserWithMessage.password || notifyUserWithMessage.general}
        value={controlledInputs.password}
      />
      {whatComp === AuthComps.register &&
        <TextInputStyled
          onChangeText={(text) => handleTextInputs('email', text)}
          placeholder='Email'
          error={notifyUserWithMessage.email}
          value={controlledInputs.email}
        />
      }
    </Container>
  )
}

const Container = styled(View)`
`;
const TextInputStyled = styled(TextInput)`
  color: white;
  margin: 5px 0px;
  background-color: ${({ error }) => {
    if (error) return '#FFBA8B'
    else return '#FFD66D'
  }};
`;