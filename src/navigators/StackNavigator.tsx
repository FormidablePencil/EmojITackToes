import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import TickTackToeScreen from '../screens/TickTackToeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useSocketIo from '../socket.io/index';
import FindMatchScreen from '../screens/FindMatchScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {

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
