/**************************************************************
 *  FileName:           styles.js
 *  Description:        Company Policy Children Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {
    level2Styles: {
        txt: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 14,
            color: '#434646',
            paddingLeft: 15,
            paddingRight: 15,
            height: '100%',
            textAlignVertical: 'center'
        },

        button: {
            margin: 3,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 10,
            backgroundColor: '#e5e5e5',
            color: '#505251',
            elevation: 3,
            textAlign: 'center'
        },

        cont: {
            width: 200
        },

        placeHolder: {
            marginTop: 15
        }
    },

    specialNoteStyle: {
        container: {
            paddingTop: 40,
            paddingLeft: 50,
            paddingRight: 80
        },

        txt: {
            fontFamily: 'Helvetica-Light',
            fontSize: 14,
            color: '#838383',
            letterSpacing: 5
        }
    },

    formStyles: {
        container: {
            paddingTop: 30,
            paddingBottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: 400,
            minWidth: 300
        },

        contForm: {
            flex: 1
        },

        formContent: {
            flex: 1,
            paddingTop: 35,
            paddingLeft: 40,
            paddingRight: 40,
            paddingBottom: 25
        }
    }
    
}