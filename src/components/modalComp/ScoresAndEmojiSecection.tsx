import React from 'react'
import { Text, LayoutAnimation, StyleSheet, View } from 'react-native'
import { ScoresCompTypes, Players } from "../../TypesTypeScript/TypesAndInterface";
import styled from "styled-components";
import { TouchableRipple, Button, useTheme } from "react-native-paper";
import { reusableStyles } from '../../styles/stylesglobal';
import { useSelector } from 'react-redux';
import { rootT } from '../../store';
import useCheckIfOnlineGame from '../../hooks/useCheckIfOnlineGame';

const ScoresAndEmojiSecection = ({
  controlledInputs,
  score,
  changingEmoji,
  selectedPlayerToChooseCharacter,
  setSelectedPlayerToChooseCharacter
}: ScoresCompTypes) => {
  const theme = useTheme()
  const hostUsername = useSelector((state: rootT) => state.multiplayer.socketIoData.host.username)
  const guestUsername = useSelector((state: rootT) => state.multiplayer.socketIoData.guest.username)
  const isGameOnline = useCheckIfOnlineGame()

  const showEmojiSelectorBtnOnPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear); //transition effect not working here
    if (selectedPlayerToChooseCharacter === Players.p1 || selectedPlayerToChooseCharacter === Players.p2) {
      setSelectedPlayerToChooseCharacter(null)
    } else { setSelectedPlayerToChooseCharacter(Players.p1) }
  }

  return (
    <ScoreContainer style={{ top: selectedPlayerToChooseCharacter === null ? -30 : 0 }}>
      <PlayerContainer>
        {selectedPlayerToChooseCharacter === null ?
          <>
            <View style={styles.containerUserText}>
              {isGameOnline && <Text style={{ ...reusableStyles.regText, ...styles.usernameTxt }}>{hostUsername}</Text>}
            </View>
            <Text style={{ textAlign: 'center', fontSize: 50 }}>
              {controlledInputs.playerCharacter[1]}
            </Text>
          </>
          :
          <TouchableRippleStyled
            style={{
              borderWidth: selectedPlayerToChooseCharacter === Players.p1 ? 1 : 0,
              backgroundColor: selectedPlayerToChooseCharacter === Players.p2 ? 'rgba(45,45,45,.2)' : 'rgba(224,224,224,.3)',
              // borderColor: selectedPlayerToChooseCharacter === Players.p2 ? 'rgba(224,224,224,3)' : 'transparent'
            }}
            onPress={() => setSelectedPlayerToChooseCharacter(Players.p1)}
          >
            <Text style={{ textAlign: 'center', fontSize: 50 }}>{controlledInputs.playerCharacter[1]}</Text>
          </TouchableRippleStyled>
        }
        {selectedPlayerToChooseCharacter === null &&
          <Text
            style={{
              textAlign: 'center', fontSize: 40, color: 'white',
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {
                width: -1,
                height: 1,
              },
              textShadowRadius: 10,
            }}
          >{score.p1}</Text>
        }

      </PlayerContainer>

      <EmojiSelectorView>
        {changingEmoji &&
          <Button
            mode='contained'
            color={theme.colors.accent}
            onPress={() => showEmojiSelectorBtnOnPress()}>
            <Text
              style={{ textAlign: 'center', fontSize: 20 }}
            >😃</Text>
          </Button>
        }
      </EmojiSelectorView>

      <PlayerContainer>
        {selectedPlayerToChooseCharacter === null ?
          <>
            <View style={styles.containerUserText}>
              {isGameOnline && <Text style={{ ...reusableStyles.regText, ...styles.usernameTxt }}>{guestUsername}</Text>}
            </View>
            <Text style={{ textAlign: 'center', fontSize: 50 }}>{controlledInputs.playerCharacter[2]}</Text>
          </>
          :
          <TouchableRippleStyled
            style={{
              borderWidth: selectedPlayerToChooseCharacter === Players.p2 ? 1 : 0,
              backgroundColor: selectedPlayerToChooseCharacter === Players.p2 ? 'rgba(224,224,224,.3)' : 'rgba(45,45,45,.2)',
              // borderColor: selectedPlayerToChooseCharacter === Players.p2 ? 'rgba(224,224,224,3)' : 'transparent'
            }}
            onPress={() => setSelectedPlayerToChooseCharacter(Players.p2)}
          >
            <Text
              style={{ textAlign: 'center', fontSize: 50 }}
            >
              {controlledInputs.playerCharacter[2]}
            </Text>
          </TouchableRippleStyled>
        }
        {selectedPlayerToChooseCharacter === null &&
          <Text
            style={{
              textAlign: 'center', fontSize: 40, color: 'white',
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {
                width: -1,
                height: 1,
              },
              textShadowRadius: 10,
            }}
          >{score.p2}</Text>
        }

      </PlayerContainer>
    </ScoreContainer>
  )
}

const styles = StyleSheet.create({
  containerUserText: {
    position: "absolute",
    top: -20,
    left: -40,
    width: 140,
    height: 10
  },
  usernameTxt: {
    textAlign: "center"
  }
})


const EmojiSelectorView = styled.View`
`;
const PlayerContainer = styled.View`
`;
const ScoreContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  flex: 1;
`;

const TouchableRippleStyled = styled(TouchableRipple)`
  padding-horizontal: 5px;
  height: 30px;
  width: 30px;
  border-color: transparent;
  align-items: center;
  justify-content: center;
  border-radius: 5px; width: 70px; height: 70px;
`;

export default ScoresAndEmojiSecection