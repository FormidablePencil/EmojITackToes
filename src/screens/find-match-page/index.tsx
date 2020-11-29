import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import GamesAvailable from './components/GamesAvailable';
import useLobby from '../../hooks/useLobby';
import RefreshLobbiesBtn from './components/RefreshLobbiesBtn';
import InputUsername from './components/InputUsername';
import HostGameBtn from './components/HostGameBtn';
import PageWrapper from '../../layouts/PageWrapper';

const FindMatchScreen = () => {
  const navigation = useNavigation()
  useLobby()

  const onPressTopRightIcon = () => navigation.navigate('menu')

  return (
    <PageWrapper icon='menu' onPressTopRightIcon={onPressTopRightIcon}>
      <View style={styles.container}>
        <InputUsername />
        <GamesAvailable />
        <View style={styles.btnGroup}>
          <HostGameBtn />
          <RefreshLobbiesBtn />
        </View>
      </View>
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#311191',
    flex: 1,
    position: "relative",
  },
  goBackContainer: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
  },
  goBackBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#6991c1'
  },
  btnGroup: {
    justifyContent: "center",
    alignItems: 'center',
    padding: 10,
    // height: 200,
  },
})

export default FindMatchScreen