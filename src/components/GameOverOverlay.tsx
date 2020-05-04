import React from 'react'
import { ModalContents } from "./../TypesTypeScript/TypesAndInterface"
import { View } from 'react-native'
import { TouchableRipple, withTheme, Text } from 'react-native-paper'
import styled from 'styled-components'

const GameOverOverlay = ({ setShowInModal, startGame, theme }) => {

  enum Action {
    goToSelectCharacter,
    playAgain
  }
  const onPressHandler = (action) => {
    if (action === Action.goToSelectCharacter) {
      setShowInModal(ModalContents.GameMenu)
    } else if (action === Action.playAgain) {
      startGame()
    }
  }

  return (
    <ContainerAligning>
      <JustifyCol>
        <BtnContainer>
          <TouchableRippleStyled
            theme={theme}
            onPress={() => onPressHandler(Action.goToSelectCharacter)}
          >
            <View style={{ flexDirection: 'column' }}>
              <TextStyled>Select</TextStyled>
              <TextStyled>character</TextStyled>
            </View>
          </TouchableRippleStyled>
          <TouchableRippleStyled
            theme={theme}
            onPress={() => onPressHandler(Action.playAgain)}
          >
            <TextStyled>Play again</TextStyled>
          </TouchableRippleStyled>
        </BtnContainer>
      </JustifyCol>
    </ContainerAligning>
  )
}

const BtnContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
  background-color: rgba(0,0,0,.3);
  padding: 25px 0px;
`;
const TouchableRippleStyled = styled(TouchableRipple)`
  background-color: ${props => {
    let color = props.theme.colors.primary
    const transparentColor = color.replace("1.0)", ".9)");
    return transparentColor
    }};
  border-radius: 10px;
  padding: 5px 20px;
  justify-content: center;
`;
const TextStyled = styled(Text)`
  font-size: 15px;
  color: white;
  text-align: center;
`
const ContainerAligning = styled(View)`
/* background-color:red */
  height: 100%;
  align-items: center;
  justify-content: space-around;
`;
const JustifyCol = styled(View)`
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 30%;
`


export default withTheme(GameOverOverlay)
