import React from 'react';

//import redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import { StatusBar, View } from 'react-native'
import { Notify, Dialog } from './components'
import Navigation from './configs/navigation'
import { colors } from './configs'
export default () => {

  const store = createStore(reducers, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: colors.bg_app }}>
        <StatusBar
          translucent
          barStyle='dark-content'
          backgroundColor='transparent' />

        <Navigation />

        <Notify />
        <Dialog />
      </View >
    </Provider >
  );
}