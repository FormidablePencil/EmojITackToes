import { DefaultTheme, Theme } from 'react-native-paper'

interface TikTackToeTypes {
  colors: {
    statusBar: string
  }
  fonts: {
    bold: { fontFamily: string }
    semiBold: { fontFamily: string }
  }
}
export type TickTackToeThemeTypes = TikTackToeTypes & Theme

export const TickTackToeTheme: TickTackToeThemeTypes = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: '#9942B9',
    primary: '#37539B',
    background: '#5C343B',
    statusBar: '#342023',
  },
  fonts: {
    ...DefaultTheme.fonts,
    light: { fontFamily: 'LemonadaLight' },
    regular: { fontFamily: 'LemonadaRegular' },
    medium: { fontFamily: 'LemonadaMedium' },
    bold: { fontFamily: 'LemonadaBold' },
    semiBold: { fontFamily: 'LemonadaSemiBold' },
  },
  roundness: 12,
}
