import React, { useEffect, useState } from 'react';
import { Text, StatusBar } from 'react-native';
import * as Font from 'expo-font' //fonts
import TickTackToeScreen from './src/screens/TickTackToeScreen';
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import configureStore from './src/store';
import { TickTackToeTheme } from './src/styles/theming';


//app theme is the theme provided by the Boring app this is the standalone app
export default function App({ AppTheme }) {
  const store = configureStore()
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'LemonadaLight': require('./src/assets/fonts/Lemonada/static/Lemonada-Light.ttf'),
        'LemonadaRegular': require('./src/assets/fonts/Lemonada/static/Lemonada-Regular.ttf'),
        'LemonadaMedium': require('./src/assets/fonts/Lemonada/static/Lemonada-Medium.ttf'),
        'LemonadaSemiBold': require('./src/assets/fonts/Lemonada/static/Lemonada-SemiBold.ttf'),
        'LemonadaBold': require('./src/assets/fonts/Lemonada/static/Lemonada-Bold.ttf'),
      })
      setFontLoaded(true)
    }
    loadFonts()
  }, [])

  return (
    <Provider store={store}>
      <PaperProvider theme={AppTheme ? AppTheme : TickTackToeTheme}>
        <StatusBar backgroundColor={TickTackToeTheme.colors.statusBar} />
        {fontLoaded ?
          <TickTackToeScreen />
          : <Text>Loading...</Text>
        }
      </PaperProvider>
    </Provider>
  );
}
