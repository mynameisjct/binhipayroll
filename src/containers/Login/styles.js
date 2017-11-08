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
    justifyContent: 'center',
    maxHeight: 750,
  },

  mainCont: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
    
    width: 400,
    borderRadius: 5,
    borderColor: 'transparent',
    borderWidth: 1,
    shadowColor: '#D1D4D6',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },

  boxCont: {
    minWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxContHeader: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },

  boxContBottom: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },

  boxContField: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: -1
  },

  boxContLogin: {
    alignItems: 'center',
  },

  headerCont: {
    backgroundColor: '#D1D4D6',
    flex  : 1,
    minHeight: 30,
    
  },

  logoCont: {
    backgroundColor: '#FFF',
    flex: 1.5,
  },

  formCont: {
    backgroundColor: '#FFF',
    flexDirection: 'column',
    flex: 4,
  },

  btnCont: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },

  timeCont: {
    flexDirection: 'row',
    marginTop: 12,
  },

  loginCont: {
    backgroundColor: '#fff',
    marginTop: 12,
  },

  //Header Styles
  textDate:{
    color:'#434646',
    fontFamily:'helvetica',
    fontSize:13,
    fontWeight:'100',
    textAlign: 'center'
  },

  textTime:{
    color:'#434646',
    fontFamily:'helvetica',
    fontSize:30,
    fontWeight:'bold',
    textAlign: 'center'
  },

    //Logo Styles
  
    textLogoLabel:{
      color:'#000',
      fontFamily:'Helvetica-Light',
      fontSize:12,
      fontWeight:'100',
      textAlign: 'center',
      marginTop: 5,
    },
  
    imgLogo:{
      width:140,
      height:60,
      marginLeft: 10
    },

    flexIcon:{
      backgroundColor: '#D1D4D6',
      alignItems:'center',
      justifyContent: 'center',
      width: 50,
      height: 50
    },

    textinputField:{
      backgroundColor: '#D1D4D6',
      height: 50,
      minWidth: 280
    },

    btnTimeCont:{
      width: 158,
      height: 50,
      borderColor :'red',
    },
    
    btnGap:{
      width: 15,
    },
    
    bottomGap: {
      flex: 0.4,
      backgroundColor: '#fff',
      minWidth: 400,
    }
};

