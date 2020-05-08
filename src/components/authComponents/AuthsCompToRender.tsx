import React, { useState, useContext } from 'react'
import EnterOptions from './EnterOptions'
import { LoginAndRegisterComp } from './LoginAndRegisterComps'
import { Button, Text } from 'react-native-paper';
import styled from 'styled-components';
import { View } from 'react-native';
import { loginAction, registerAction, AuthActionResponses } from '../../actions/authActions';
import { useDispatch } from 'react-redux';
import { handleValidationResponses, AuthValidationResponses } from '../../logic/validateInputFormats';
import { WhatCompRenderedContext, AuthComps, NotifyUserWithMessageContext } from '../../screens/AuthenticationScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { fetchUserDataAction } from '../../actions/fetchUserDataAction';
import useReactToAuthResponses from '../../useHooks/useReactToAuthRespones';

export interface ControlledInputsTypes {
  username: string,
  password: string,
  email: string
}


const AuthsCompToRender = ({ keyboardPresent }) => {
  const { setNotifyUserWithMessage, notifyUserWithMessage } = useContext(NotifyUserWithMessageContext)
  const { whatComp, setWhatComp } = useContext(WhatCompRenderedContext)
  const [controlledInputs, setControlledInputs] = useState<ControlledInputsTypes>({
    username: null,
    password: null,
    email: null
  })
  const { reactToAuthResponses } = useReactToAuthResponses({ setNotifyUserWithMessage, handleValidationResponses })
  const dispatch = useDispatch()

  enum onPress { goBack, authenticate }
  const onPressHandler = (action) => {
    switch (action) {
      case onPress.goBack:
        setWhatComp(AuthComps.EnterOptions)
        break;

      case onPress.authenticate:
        authenticateUser()
        break;

      default:
        break;
    }
  }

  const authenticateUser = async () => {
    let action
    if (whatComp === AuthComps.login) {
      action = await dispatch(loginAction(controlledInputs))
    } else if (whatComp === AuthComps.register) {
      action = await dispatch(registerAction(controlledInputs))
    }
    reactToAuthResponses(action)
  }

  return (
    <Container style={keyboardPresent && { paddingVertical: 80 }}>
      {Object.values(notifyUserWithMessage)[0] && !keyboardPresent &&
        <NotifyMsgContainer>
          {Object.values(notifyUserWithMessage).map(message =>
            <UserErrMsgText>- {message}</UserErrMsgText>
          )}
        </NotifyMsgContainer>
      }
      {(whatComp === AuthComps.EnterOptions) ?
        <EnterOptions setWhatComp={setWhatComp} />
        : (whatComp === AuthComps.login || whatComp === AuthComps.register) &&
        <LoginAndRegisterComp
          controlledInputs={controlledInputs}
          setControlledInputs={setControlledInputs}
          whatComp={whatComp} />
      }
      {whatComp !== AuthComps.EnterOptions &&
        <Row>
          <ButtonStyled
            style={{ marginRight: 10 }}
            mode='contained'
            onPress={() => onPressHandler(onPress.goBack)}
          >back</ButtonStyled>
          <ButtonStyled
            style={{ marginLeft: 10 }}
            mode='contained'
            onPress={() => onPressHandler(onPress.authenticate)}
          >{whatComp}</ButtonStyled>
        </Row>
      }
    </Container>
  )
}

const NotifyMsgContainer = styled(View)`
  margin: 4px -10px;
  padding: 10px 15px;
  /* width: ${props => props.width}px; */
  background-color: rgba(0,0,0,.6);
`;
const UserErrMsgText = styled(Text)`
  /* text-align: center; */
  font-size: 10px;
  color: #FFE4E0;
  line-height: 15px;
  width: 100%;
  margin-vertical: 3px;
`;
const ButtonStyled = styled(Button)`
  flex: 1;
  margin: 10px 0px;
`;
const Container = styled(View)`
  flex: 2;
  /* top: -10px; */
  margin: 10px;
  justify-content: center;
`;
const Row = styled(View)`
  flex-direction: row;
`;

export default AuthsCompToRender