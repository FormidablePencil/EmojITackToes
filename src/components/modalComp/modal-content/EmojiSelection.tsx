import React from 'react'
import { View } from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';
import { useTheme, Text } from 'react-native-paper';
import styled from 'styled-components';

function EmojiSelection({ selectedPlayerToChooseCharacter, Players, onEmojiSelectHandler, Categories }) {
  const theme = useTheme()
  return (
    <>

      {selectedPlayerToChooseCharacter === Players.p1 || selectedPlayerToChooseCharacter === Players.p2 ?
        <FlexContainer style={{ marginHorizontal: 40, marginVertical: 20, flex: 5 }}>
          <View style={{ width: '100%', height: '100%' }}>
            <EmojiSelector
              tabBottomBoarderColor={'lightgrey'}
              emojiSelectorContainerOverride={{ backgroundColor: theme.colors.accent, borderRadius: 10, paddingTop: 5 }}
              theme={theme.colors.primary}
              showSearchBar={false}
              searchBarBgColor={'#C8FFF8'}
              showSectionTitles={false}
              showTabs={true}
              category={Categories.emotion}
              onEmojiSelected={emoji => onEmojiSelectHandler(emoji)}
            />
          </View>
        </FlexContainer>
        :
        <FlexContainer style={{ margin: 50, flex: 1 }}>
          <Text style={{
            fontSize: 25, color: "white",
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {
              width: -1,
              height: 1,
            },
            textShadowRadius: 10,
          }}>Emoji Tack Toe</Text>
        </FlexContainer>
      }
    </>
  )
}

const FlexContainer = styled.View`
  align-items: center;   justify-content: space-evenly;
`;

export default EmojiSelection
