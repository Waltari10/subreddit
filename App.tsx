import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux'

// @ts-ignore
import configureStore from './src/redux/configureStore';

import Subreddit from './src/containers/Subreddit'


const store = configureStore();


export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Subreddit></Subreddit>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
