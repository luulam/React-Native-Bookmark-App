import React from 'react';

//import redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import { StatusBar, View } from 'react-native'
import { Notify, Dialog } from './components'
import Navigation from './configs/navigation'

export default () => {

  const store = createStore(reducers, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar
          translucent
          barStyle='dark-content'
          backgroundColor='transparent' />
        <Notify />
        <Dialog />
        <Navigation />
      </View >
    </Provider >
  );
}