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
    justifyContent: 'center',
    alignItems:'center'
  },

  flexCont: {
    flex: -1, 
    flexDirection: 'column',
    borderColor: 'red',
    marginTop: 30,
    width: 370,
    height: 460,
    borderRadius: 4,
    borderColor: '#ddd',
    borderBottomWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    alignItems: 'center'
  },

  flexHeader:{
    backgroundColor: '#D1D4D6',
    justifyContent: 'center',
    alignItems:'center',
    height: 100,
    width: 359
  },

  flexFormUsername:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    width: 285,
    marginTop: 30,
  },
  
  flexFieldUsername:{
    justifyContent: 'center',
    alignItems:'center',
  },

  flexFormPassword:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    width: 285,
    marginTop: 15
  },

  flexFieldPassword:{
    justifyContent: 'center',
    alignItems:'center',
  },

  flexIcon:{
    backgroundColor: '#D1D4D6',
    alignItems:'center',
    justifyContent: 'center',
    width: 50,
    height: 45
  },

  textinputField:{
    width: 260,
    backgroundColor: '#D1D4D6',
    borderWidth: 0.3,
    height: 45,
  },

  flexButtonTime:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    width: 300,
    borderWidth: 1,
    height: 50,
  },

  //Header Styles
  textDate:{
    color:'#434646',
    fontFamily:'helvetica',
    fontSize:12,
    fontWeight:'100'
  },

  textTime:{
    color:'#434646',
    fontFamily:'helvetica',
    fontSize:25,
    fontWeight:'bold',
  },

  //Logo Styles

  flexLogo:{
    justifyContent: 'center',
    alignItems:'center'
  },

  textLogoLabel:{
    color:'#000',
    fontFamily:'helvetica light',
    fontSize:12,
    fontWeight:'300',
    marginTop:5,
    justifyContent:'center',
  },

  imgLogo:{
    marginTop: 20,
    width:130,
    height:60,
    borderColor:'white',
    marginLeft: 5
  },
};
