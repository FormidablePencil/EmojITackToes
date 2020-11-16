import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import TickTackToeScreen from '../screens/TickTackToeScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useSocketIo from '../socket.io/index';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { sendMessage, setSocketIoData, socketIoData } = useSocketIo()

  return (
    <NavigationContainer>
      <ButtonSendText sendMessage={sendMessage} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {/* <Stack.Screen name='Authentication' component={AuthenticationScreen} /> */}
        <Stack.Screen name='Game' component={TickTackToeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const ButtonSendText = ({ sendMessage }) =>
  <TouchableOpacity style={{ height: 100 }} onPress={sendMessage}>
    <Text>Send simple text</Text>
  </TouchableOpacity>

export default StackNavigator
