import React from 'react';
import {View, Platform, StatusBar, StyleSheet} from 'react-native';
import {Calculator} from './src/component/Calcualtor';
export default function App() {
  return (
    <View style={styles.container}>
      <Calculator />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    backgroundColor: '#F1F2F3',
  },
});
