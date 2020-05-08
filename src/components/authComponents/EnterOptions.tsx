import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import styled from 'styled-components'
import { AuthComps } from '../../screens/AuthenticationScreen'

const EnterOptions = ({setWhatComp}) => {
  return (
    <>
      <ButtonStyled mode='contained' onPress={() => setWhatComp(AuthComps.login)}>
        Login
      </ButtonStyled>
      <ButtonStyled mode='contained' onPress={() => setWhatComp(AuthComps.register)}>
        New user
      </ButtonStyled>
      <ButtonStyled mode='contained'>
        guest
      </ButtonStyled>
    </>
  )
}

const ButtonStyled = styled(Button)`
  margin: 10px;
`;

export default EnterOptions
