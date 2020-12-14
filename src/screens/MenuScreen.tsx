import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { reusableStyles } from '../styles/stylesglobal'
import { BgLinearGradient } from './tick-tack-toe-page';

function MenuScreen() {
  const navigation = useNavigation()

  const onPressLocalMode = () => navigation.navigate('game')
  const onPressMultiMode = () => navigation.navigate('findMatch')


  return (
    <BgLinearGradient>
      <View style={styles.menuPgContainer}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tick Tack Toes</Text>
          <Text style={styles.subtitle}>(with emojis)</Text>

          <Image style={styles.emojiImg} source={require('../assets/images/icon.png')} />
        </View>


        <View style={styles.menuSelection}>
          <TouchableOpacity style={{ ...reusableStyles.regBtn }} onPress={onPressLocalMode}>
            <Text style={reusableStyles.regText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...reusableStyles.regBtn }} onPress={onPressMultiMode}>
            <Text style={reusableStyles.regText}>Play Online</Text>
          </TouchableOpacity>
        </View>

      </View>
    </BgLinearGradient>
  )
}

const styles = StyleSheet.create({
  menuPgContainer: {
    flex: 1,
    ...reusableStyles.totallyCenter,
  },
  menuSelection: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    ...reusableStyles.totallyCenter,
  },
  menuItemText: {
  },
  title: {
    fontSize: 40,
    fontFamily: 'LemonadaSemiBold',
    ...reusableStyles.regText,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'LemonadaLight',
    ...reusableStyles.regText,
  },
  emojiImg: {
    top: 50,
    height: 100,
    width: 100,
  },
})


export default MenuScreen
