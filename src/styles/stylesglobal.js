import styled from 'styled-components'

export const Col = styled.View`
  flex-direction: row;
  flex: 1;
`;
export const Row = styled.View`
  flex-direction: column;
  flex: 1;
`;
export const Item = styled.TouchableOpacity`
  flex: 1;
  justify-content:center;
  align-items: center;
`;
export const GameContainer = styled.View`
  margin: 0px;
`;
export const Container = styled.View`
  justify-content: center;
  background-color: #5C343B;
`;

export const VerticalLine = styled.View`
  width: 3px;
  background-color: white;
`;
export const HorizontalLine = styled.View`
  height: 3px;
  background-color: white;
`;
export const StandardText = styled.Text`
  color: white;
  font-size: 40px;
  justify-content: center;
  align-items: center;
`;
export const BottomView = styled.View`
  flex: 1; 
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const TopView = styled.View`
  flex: 1;
  justify-content: space-evenly;
  flex-direction: row;
  align-items:center;
`;
export const Score = styled.View`
  align-items:center;
  border-color: black;
  border-radius: 20px;
`;
export const TextPlayer = styled.Text`
  background-color: ${props => props.active ? 'rgba(255,	255,	0, .8)' : 'transparent'};
  color: ${props => props.active ? 'black' : 'white'};
  padding: 5px;
`;
export const CharacterBackGround = styled.View`
  background-color: red;
  border-radius: 100px;
  height: 70px;
  width: 70px;
  justify-content: center;
  align-items: center;
`;