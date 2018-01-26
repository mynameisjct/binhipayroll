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
        backgroundColor: '#f9f9f9',
        margin: 10,
        marginBottom: 0,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        elevation: 20
    },

    contDivider: {
        flex: 1,
        flexDirection: 'row'
    },

    contFormLeft: {
        flex: 1, 
        paddingLeft: 40,
        paddingRight: 20,
        paddingBottom: 30,
        marginTop: -10
    },

    contFormRight: {
        flex: 1, 
        paddingLeft: 20,
        paddingRight: 40,
        paddingBottom: 30,
        marginTop: -10
    },
    
    contTitle: {
        alignItems: 'center',
        marginTop: 15, 
        marginBottom: 15, 
        marginLeft: 20
    },

    contButton: {
        flex:1, 
        paddingBottom: 15, 
        paddingTop: 30
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }

}
   