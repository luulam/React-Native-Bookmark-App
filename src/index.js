import React from 'react';

//import redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';

import Navigation from './configs/navigation'

export default () => {
  const store = createStore(reducers, applyMiddleware(thunk))
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}