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
    primary: 'rgba(215,66,131,1.0)',
    accent: 'rgba(122,223,203,1.0)',
    background: '#356B94',
    statusBar: '#1D1236',
  },
  fonts: {
    ...DefaultTheme.fonts,
    light: { fontFamily: 'LemonadaLight' },
    regular: { fontFamily: 'LemonadaRegular' },
    medium: { fontFamily: 'LemonadaMedium' },
    bold: { fontFamily: 'LemonadaBold' },
    semiBold: { fontFamily: 'LemonadaSemiBold' },
  },
  roundness: 6,
}
