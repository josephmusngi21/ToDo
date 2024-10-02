import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ToDo from './components/todo'
import * as React from 'react';

export default function App() {
  console.log('App Rendered');


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ToDo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
