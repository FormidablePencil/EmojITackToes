import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { useTheme, Button } from 'react-native-paper'
import { AlignAllContainer, ModalContainerLinearGradient } from './modalComp/modal-content'
import { ModalContents } from '../TypesTypeScript/TypesAndInterface'
import { Animations } from '../reducers/animationSettingReducer'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { SET_ANIMATION_SETTING } from '../actions/types'

const AnimationOptions = ({ setShowInModal, startGame }) => {
  const theme = useTheme()
  const animationSetting = useSelector((state: any) => state.animationSetting)
  const dispatch = useDispatch()

  const onPressHandler = (animation) => {
    dispatch({ type: SET_ANIMATION_SETTING, payload: Animations[animation] })
  }

  return (
    <AlignAllContainer style={{ width: '90%', height: '90%', alignSelf: 'center' }}>
      <ImageBackground
        style={{
          borderRadius: 40,
          height: '90%',
          width: '100%',
          overflow: 'hidden',
          // elevation: 20,
        }}
        source={require('../assets/images/smiley-1041796_1920.jpg')}
      >
        <ModalContainerLinearGradient style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} theme={theme} colors={['rgba(203,29,131,.8)', 'rgba(47,6,122,1)']}>
          <ScrollView style={{ width: '100%', }}>
            {Object.entries(Animations).map((animation, index) => {
              const animationFormated = animation[0].replace(/_/g, ' ')
              return (
                <Button
                  key={index}
                  style={{ backgroundColor: animationSetting === animation[1] ? 'rgba(158,127,255,.7)' : 'transparent', borderRadius: 0 }}
                  color='#EBB6FF'
                  onPress={() => onPressHandler(animation[0])}>{animationFormated}</Button>
              )
            })}
          </ScrollView>
          <View style={{ height: .2, backgroundColor: 'white', width: "100%" }}></View>
          <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
            <Button
              color={theme.colors.primary}
              onPress={(() => setShowInModal(ModalContents.GameMenu))}
              style={{ margin: 20 }}
              labelStyle={{ color: 'white' }} mode='contained'>Back</Button>
            <Button
              color={theme.colors.primary}
              onPress={(() => startGame(ModalContents.GameMenu))}
              style={{ margin: 20 }}
              labelStyle={{ color: 'white' }} mode='contained'>Start</Button>
          </View>

        </ModalContainerLinearGradient>
      </ImageBackground>
    </AlignAllContainer >

  )
}

export default AnimationOptions
