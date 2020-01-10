import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PageHome from './src/pages/PageHome';

export default function App() {
  return (
    <View style={styles.container}>
      <PageHome/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
