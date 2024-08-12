/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Platform, StatusBar} from 'react-native';
import {KeyBoard} from './src/component/KeyBoard';
export default function App() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
        backgroundColor: '#F1F2F3',
      }}>
      <KeyBoard />
    </View>
  );
}
