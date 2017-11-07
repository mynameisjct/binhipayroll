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

export default class Main extends Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}
