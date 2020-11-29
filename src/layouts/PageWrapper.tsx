import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { BgLinearGradient } from '../screens/tick-tack-toe-page';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PageWrapper = ({ children, onPressTopLeftIcon, icon }) => {

  const Icon = () =>
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressTopLeftIcon}>
        <Feather name={icon} size={32} color="white" />
      </TouchableOpacity>
    </View>

  return (
    <BgLinearGradient>
      <Icon />
      {children}
    </BgLinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: "absolute",
    right: 15,
    top: 16,
  },
})


export default PageWrapper
