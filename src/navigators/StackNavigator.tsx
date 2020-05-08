import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import TickTackToeScreen from '../screens/TickTackToeScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
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

export default StackNavigator
