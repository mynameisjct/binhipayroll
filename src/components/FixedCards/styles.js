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
        backgroundColor: '#fff',
        borderRadius: 2,
        marginTop: 7,
        marginLeft: 7,
        marginRight: 7,
        marginBottom: 2,
        elevation: 3,
        paddingBottom: 20
    },

    header: {
        container: {
            backgroundColor: 'transparent',
            height: 70,
            flexDirection: 'row'
        },

        contTitle: {
            flex: 1,
            backgroundColor: 'transparent'
        },

        placeHolderTitle: {
            flex: 1,
            paddingTop: 10,
            paddingBottom: 15,
            paddingLeft: 40,
            alignSelf: 'flex-start',
            justifyContent: 'flex-end',
            backgroundColor: 'transparent',
            /* borderBottomRightRadius: 50 */
        },

        contBtn: {
            width: 100,
            backgroundColor: 'transparent',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            paddingTop: 15,
            paddingRight: 30
        },

        txtTitle: {
            fontSize: 15,
            color: '#505251',
            fontWeight:'500',
            fontFamily: 'Helvetica-Bold'
        }
    },

    content: {
        container: {
            marginLeft: 40,
            backgroundColor: 'transparent'
        },

        placeHolderData: {
            flexDirection: 'row',
            paddingTop: 15,
            paddingBottom: 15,
            borderTopWidth: 1,
            borderColor: '#D1D4D6'
        },

        contLabel: {
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'flex-start'
        },

        contValue: {
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'flex-start'
        },

        txtLabel: {
            fontSize: 14,
            color: '#838383',
            fontFamily: 'Helvetica-Light'
        },

        txtValue: {
            fontSize: 14.5,
            color: '#434646',
            fontFamily: 'Helvetica-Light'
        },

        txtValueTitle: {
            fontWeight: 'bold',
            color: '#434646',
            fontFamily: 'Helvetica-Light'
        },

        txtValueDescription: {
            fontSize: 13,
            color: '#434646',
            fontFamily: 'Helvetica-Light',
            fontWeight: '100'
        }
    }
}