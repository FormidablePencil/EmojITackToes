import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TickTackToeScreen from '../screens/tick-tack-toe-page';
import { NavigationContainer } from '@react-navigation/native';
import useSocketIo from '../socket.io/useSocketIo';
import FindMatchScreen from '../screens/find-match-page';
import MenuScreen from '../screens/MenuScreen';
import MuteSound from '../components/background-music/MuteSound';
import useMusicBackground from '../hooks/useMusicBackground';

const Stack = createStackNavigator();

const StackNavigator = () => {
  useSocketIo()
  useMusicBackground()

  return (
    <NavigationContainer>
      <MuteSound />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='menu' component={MenuScreen} />
        <Stack.Screen name='findMatch' component={FindMatchScreen} />
        <Stack.Screen name='game' component={TickTackToeScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  )
}

export default StackNavigator