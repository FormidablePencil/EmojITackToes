import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Feather } from '@expo/vector-icons';
import { BgLinearGradient } from '../screens/tick-tack-toe-page';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { reusableStyles } from '../styles/stylesglobal';

const PageWrapper = ({ children, onPressTopRightIcon, icon }: { children, onPressTopRightIcon, icon?}) => {

  const Icon = () =>
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressTopRightIcon}>
        {icon ?
          <Feather name={icon} size={32} color="white" />
          : <Text style={reusableStyles.regText}>Quit</Text>
        }
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
