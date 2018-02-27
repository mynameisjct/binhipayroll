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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center'
  },

  headerTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    color: '#434646'
  },

  headerLeft:{
    height: '100%',
    width: 70,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerRight:{
    height: '100%',
    width: 70,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },

  txtBtn: {
    fontFamily: 'Helvetica-Light',
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
  },

  specialForm: {
    headerRight:{
      height: '60%',
      width: 200,
      paddingRight: 15,
      /* backgroundColor: 'red', */
      flexDirection: 'row'
    },

    headerLeft:{
      height: '100%',
      width: 200,
      paddingLeft: 23,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },

    contBtn:{
      flex: 1,
      width: '100%',
      backgroundColor: 'transparent'
    },

    contBtnWrapper: {
        flex: 1,
        flexDirection: 'row',
        /* borderWidth: 1, */
    },

    contIcon: {
      left: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        /* borderWidth: 1 */
        /* backgroundColor: 'red' */
      },
      
      right: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        /* borderWidth: 1 */
      }
    },

    contLabel: {
      left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRightWidth: 0.7, 
        borderColor: '#D1D4D6'
      },
      right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
      }
    }
  }
};