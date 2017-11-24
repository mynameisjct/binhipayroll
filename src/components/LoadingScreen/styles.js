/**************************************************************
 *  FileName:           styles.js
 *  Description:        Digital Clock Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {
  container:{
    flex:1,
    backgroundColor: 'rgba(255, 255, 255,1);',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  txtMsg:{
      color: '#000',
  },
  
  logoCont: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  messageCont:{
    flex: 0.4,
    marginTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }

};