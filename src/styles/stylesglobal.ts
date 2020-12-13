import styled from 'styled-components'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from 'react-native'

export const Col = styled(View)`
  flex-direction: row;
  flex: 1;
`;
export const Row = styled(View)`
  flex-direction: column;
  flex: 1;
`;
export const Item = styled(TouchableOpacity)`
  flex: 1;
  justify-content:center;
  align-items: center;
`;
export const GameContainer = styled(View)`
  margin: 0px;
`;
export const VerticalLine = styled(View)`
  width: 3px;
  background-color: ${({ theme }) => theme.colors ? theme.colors.accent : 'white'};
`;
export const HorizontalLine = styled(View)`
  height: 3px;
  background-color: ${({ theme }) => theme.colors ? theme.colors.accent : 'white'};
`;
export const BottomView = styled(View)`
  flex: 1; 
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const TopView = styled(View)`
  justify-content: space-evenly;
  flex-direction: row;
`;
export const Score = styled(View)`
  align-items:center;
  /* border-color: black; */
  border-radius: 20px;
`;
const CharacterBackGround = styled(View)`
  background-color: red;
  border-radius: 100px;
  height: 70px;
  width: 70px;
  justify-content: center;
  align-items: center;
`;
export const CharacterBackGroundAnimated = Animated.createAnimatedComponent(CharacterBackGround)

export const reusableStyles = StyleSheet.create({
  regBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#536aa1',
    borderWidth: 3,
    elevation: 5,
    borderRadius: 6,
    backgroundColor: 'rgb(77, 60, 204)',
    width: 210,
    height: 60,
    margin: 15,
  },
  regText: {
    color: '#d1faf0',
    fontFamily: 'LemonadaSemiBold',
  },
  regDarkText: {
    color: '#247AFF',
    fontFamily: 'LemonadaSemiBold',
  },
  smText: {
    fontSize: 13
  },
  totallyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})