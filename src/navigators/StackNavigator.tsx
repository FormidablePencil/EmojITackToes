import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TickTackToeScreen from '../screens/TickTackToeScreen';
import { NavigationContainer } from '@react-navigation/native';
import useSocketIo from '../socket.io/useSocketIo';
import FindMatchScreen from '../screens/FindMatchScreen';
import MenuScreen from '../screens/MenuScreen';
import useMusicBackground from '../hooks/useMusicBackground';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_MUTE } from '../actions/types';
import { Feather } from '@expo/vector-icons'
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { rootT } from '../store';
//  volumeX, volume2

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

const MuteSound = () => {
  const mute = useSelector((state: rootT) => state.mute)
  const dispatch = useDispatch()
  const onClickMute = () => dispatch({ type: TOGGLE_MUTE })
  return (
    <TouchableOpacity onPress={onClickMute}>
      {mute
        ? <Feather name='volume-x' size={32} color="green" />
        : <Feather name='volume-2' size={32} color="green" />
      }
    </TouchableOpacity>
  )
}


export default StackNavigator