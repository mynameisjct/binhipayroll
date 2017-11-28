/**************************************************************
 *  FileName:           App.js
 *  Description:        App Wrapper
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import AppNavigator from './src/AppNavigator';
import configureStore from './src/store';
import {Provider} from 'react-redux';

const store = configureStore();

/* store.subscribe(() => {
  console.log("Store is updated!", store.getState());
}); */

export default class Main extends Component {
  render() {
    return (
      <Provider store= {store}>
        <AppNavigator/>
      </Provider>
    );
  }
}
