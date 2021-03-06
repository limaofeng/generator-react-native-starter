import React from 'react';
import { StyleSheet, View } from 'react-native';

import LoginStatusMessage from '../components/LoginStatusMessage';
import AuthButton from '../components/AuthButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

const MainScreen = () => (
  <View style={styles.container}>
    <LoginStatusMessage />
    <AuthButton />
  </View>
);

MainScreen.navigationOptions = {
  title: 'Home Screen'
};

export default MainScreen;
