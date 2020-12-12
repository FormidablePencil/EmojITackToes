import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TickTackToeScreen from '../screens/tick-tack-toe-page';
import { NavigationContainer } from '@react-navigation/native';
import useSocketIo from '../socket.io/useSocketIo';
import FindMatchScreen from '../screens/find-match-page';
import MenuScreen from '../screens/MenuScreen';
import MuteSound from '../components/background-music/MuteSound';
import useMusicBackground from '../hooks/useMusicBackground';
import useLocalStorage from '../hooks/useLocalStorage';
import { useSelector } from 'react-redux';
import { rootT } from '../store';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const locallyStoredDataLoaded = useSelector((state: rootT) => state.locallyStoredDataLoaded)
  useLocalStorage()
  return (
    <NavigationContainer>
      <MuteSound />
      {locallyStoredDataLoaded && <Routes />}
    </NavigationContainer>
  )
}

const Routes = () => {
  useSocketIo()
  useMusicBackground()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='menu' component={MenuScreen} />
      <Stack.Screen name='findMatch' component={FindMatchScreen} />
      <Stack.Screen name='game' component={TickTackToeScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigator