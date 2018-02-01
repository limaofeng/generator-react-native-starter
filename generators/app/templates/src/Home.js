import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>首页</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
          <Text>去到设置.</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
