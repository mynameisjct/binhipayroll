/**************************************************************
 *  FileName:           styles.js
 *  Description:        Company Policy Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {
    container: {
        flex:1,
        flexDirection: 'row',
    },

    
    headerCont: {
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

    formCont: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
  },

    fieldCont: {
        paddingTop: 5
    },

    timeFieldCont: {
        backgroundColor: 'transparent',
        height: 80,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        borderBottomWidth: 1.7,
        borderColor: '#D1D4D6'
    },

    txtNameLabel: {
        fontFamily: 'Helvetica-Light',
        fontSize: 13,
        width: 300,
        color: '#838383',
        paddingLeft: 5

    },

    txtLabel: {
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        width: 100,
        marginBottom: 22,
        color: '#838383'
    },
    
    txtTime: {
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        width: 500,
        marginBottom: 2,
        color: '#434646'

    },

    textinputField:{
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        color: '#434646',
        marginBottom: 15,
        marginTop: -10
    }
}
   