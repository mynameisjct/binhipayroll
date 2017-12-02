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
    container: {
        flex:1,
        flexDirection: 'row',
    },

    tableCont: {
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },

    defaultTimeCont: {
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },

    categoryCont: {
        flex: 0.2,
        minWidth: 90,
        maxWidth: 90,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
/* 
    extensionCont: {
        flex: 0.1,
        minWidth: 0,
        maxWidth: 50,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    }, */

    categoryPlaceholder: {
        height: 40, 
        alignItems: 'flex-start', 
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    extensionPlaceholder: {
        height: 40, 
    },

    detailsCont: {
        flex:0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    dailyCont: {
        flexDirection: 'column',
        width: 76.4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    dailyPlaceholder: {
        flex: 1,
        height: 40, 
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    txtVerticalHeader: {
        fontFamily: 'Helvitica-Bold',
        fontSize: 14,
        fontWeight: '100',
        marginLeft: 20,
    },

    txtHorizontalHeader: {
        fontFamily: 'Helvitica-Bold',
        fontSize: 14,
        fontWeight: '100'
    },

    txtContent: {
        textDecorationLine: 'underline',
        fontFamily: 'Helvitica-Light',
        fontSize: 13
    },

    defaultTimeMargin: {
        width: 90,
        height: 1,
    },

    defaultTimeCheckbox: {
        marginLeft: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    defaultTimePlaceholder: {
        marginLeft: 45,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    txtDefaultTimeMsg:{
        fontFamily: 'Helvitica-Light',
        fontSize: 13
    },

    txtDefaultTime:{
        textDecorationLine: 'underline',
        fontFamily: 'Helvitica-Light',
        fontSize: 13,
        marginTop: 10,
    }
    

}