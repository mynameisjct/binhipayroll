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
    backgroundColor: 'rgba(0, 0, 0, 0.7);',
    alignItems: 'center',
    justifyContent: 'center'
  },

  messageBox:{
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 300,
    minHeight: 200,
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 40,
  },
  
  header:{
    flexDirection: 'row',
    height: 50,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6
  },

  title: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },

  btnCloseCont: {
    justifyContent:'center',
    alignItems: 'flex-end',
    padding: 10
  },

  txtCloseBtn: {
    color: 'white',
    fontSize: 12,
  },

  txtTitle:{
    color: 'white',
    marginLeft: 10,
    fontSize: 17,
  },

  msgCont:{
    height:90,
    width: 350,
    padding: 30,
  },

  btnCont:{
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    width: 350,
  },

  btnClose:{
    borderRadius: 100, 
    width: 30, 
    height: 30, 
    backgroundColor: 'rgba(0, 0, 0, 0.2);', 
    justifyContent:'center', 
    alignItems: 'center'
  },

  txtOKBtn:{
    color: '#fff',
    fontWeight: '700'
  }

};