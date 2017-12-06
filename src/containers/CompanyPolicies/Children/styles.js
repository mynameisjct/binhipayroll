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
        flexDirection: 'column',
        backgroundColor: 'transparent',
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
        fontFamily: 'Helvetica-Bold',
        fontSize: 14,
        fontWeight: '100',
        marginLeft: 20,
        color: '#434646'
    },

    txtHorizontalHeader: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 14,
        fontWeight: '100',
        color: '#434646'
    },

    txtContent: {
        textDecorationLine: 'underline',
        fontFamily: 'Helvetica-Light',
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
        fontFamily: 'Helvetica-Light',
        fontSize: 13
    },

    txtDefaultTime:{
        textDecorationLine: 'underline',
        fontFamily: 'Helvetica-Light',
        fontSize: 13,
    },

    defaultTimeRow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 8
    },

    defaultTimeLeft: {
        width: 80
    },

    defaultTimeRight: {
    },
    
    // BreakTime
    containerPlaceholder: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },

    breakCont: {
        flex: 1,
        flexDirection: 'column'
    },

    breakTimeDetailsCont: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 50,
        backgroundColor: 'transparent'
    },

    breakNameCont: {
        flex: 0.2,
        minWidth: 180,
        maxWidth: 180,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    breakDetailsCont: {
        flex: 0.2,
        minWidth: 120,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

    breakHeaderBorder: {
        borderBottomWidth: 1,
        borderColor: '#D1D4D6'
    },

    txtDefault: {
        fontFamily: 'Helvetica-Light',
        fontSize: 14,
        color: '#434646'
    },

    txtBreakName: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 14,
        fontWeight: '100',
        paddingRight: 20,
        paddingLeft: 20,
        color: '#434646'
    },


}