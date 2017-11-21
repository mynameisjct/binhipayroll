/**************************************************************
 *  FileName:           styles.js
 *  Description:        Login Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {

  //Parent Styles
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
  },

  //Main Flex Cotainer of Login Module
  mainCont: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 490,
    width: 400,
    marginTop: 15,
    marginBottom: 20,

    borderRadius: 10,
    borderColor: 'transparent',
    borderWidth: 1,
    shadowColor: '#D1D4D6',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },

  //Default Properties of the child views
  boxCont: {
    minWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Edge of the top most view
  boxContTopEdge: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  //Edge of the bottom most view
  boxContBottom: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },

  //Header container style
  headerCont: {
    backgroundColor: '#D1D4D6',
    height: 100,
  },

  //Logo Container Style
  logoCont: {
    backgroundColor: '#fff',
    height: 120,
  },
  
  //Container of the icon and field
  boxContField: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#D1D4D6'
  },

  //Form Parent Style
  formCont: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    height: 270,
  },

  //Icon container Style
  flexIcon:{
    backgroundColor: '#D1D4D6',
    alignItems:'center',
    justifyContent: 'center',
    width: 50,
    height: 50
  },
  
  //icona style
  iconField:{
    alignSelf: 'center'
  },
  
  //Text field Style
  textinputField:{
    backgroundColor: '#D1D4D6',
    height: 50,
    minWidth: 280
  },

  //Buttons Container Style
  btnCont: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginTop: 20,
  },

  //Time-in Time-out Container Style
  timeCont: {
    flexDirection: 'row',
  },

  //TouchableOpacity
  btnTimeCont:{
    width: 158,
    height: 50,
    borderColor :'red',
  },

  boxContLogin: {
    alignItems: 'center',
  },

  loginCont: {
    backgroundColor: '#fff',
    marginTop: 5,
  },

    //Buttons Style
    touchableTimeBtn:{
      alignItems: 'center', 
      justifyContent:'center'
    },
    
    touchableLoginBtn:{
      width: 330,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#434646',
    },

    imgCustomBtn:{
      height: 45, 
      alignItems: 'center', 
      justifyContent:'center'
    },

    btnGap:{
      width: 15,
    },
    

};