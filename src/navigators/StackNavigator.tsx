import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TickTackToeScreen from '../screens/TickTackToeScreen';
import { NavigationContainer } from '@react-navigation/native';
import useSocketIo from '../socket.io/useSocketIo';
import FindMatchScreen from '../screens/FindMatchScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  useSocketIo()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='findMatch' component={FindMatchScreen} />
        <Stack.Screen name='game' component={TickTackToeScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  )
}

export default StackNavigator
