  /**************************************************************
 *  FileName:           styles.js
 *  Description:        Custom Cards Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-12-01

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {
    container:{
        flex:1,
        flexDirection: 'column',
        paddingBottom: 5
    },

    titleCont: {
        backgroundColor: '#D1D4D6',
        height: 60,
        justifyContent: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#D1D4D6'
    },

    txtTitle: {
        fontFamily: 'Helvetica-Light',
        fontSize: 18,
        color: '#434646'
    },

    txtDescription: {
        fontFamily: 'Helvetica-Light',
        fontSize: 12,
        color: '#505251'
    },

    textCont: {
        paddingLeft: 25,
        flexDirection: 'row',
        flex: 1,
    },

    contentCont: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
    },

    detailsCont: {
        backgroundColor: 'transparent',
        margin: 25,
    },

    //Child Prop Styles
    childCont: {
        flexDirection: 'row',
        minHeight: 80,
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingLeft: 20,
    },

    subContentCont: {
        flexDirection: 'column',
        minHeight: 60,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingTop: 20
    },

    customBottomBorder:{
        borderBottomWidth: 0.7,
        borderColor: '#D1D4D6',
        paddingBottom: 20,
    },

    childTitleCont: {
        backgroundColor: 'transparent',
        width: 200,
        justifyContent: 'center'
    },

    propCont: {
        backgroundColor: 'transparent',
        height: 40,
        width: 200,
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: '#434646',
        justifyContent: 'center'

    },

    propContChild: {
        backgroundColor: 'transparent',
        height: 37,
        width: 120,
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: '#434646',
        justifyContent: 'center'

    },

    adjustPropLevel1: {
        marginLeft: 30,
    },

    effectivityOptionCont: {
        backgroundColor: 'transparent',
        height: 35,
        width: 200,
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: '#434646',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

    propContTxt: {
        backgroundColor: 'transparent',
        height: 40,
        width: 120,
        paddingLeft: 15,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    txtPropTitle: {
        fontFamily: 'Helvetica-Bold',
        color: '#434646',
        fontSize: 15,
        fontWeight: '500'
    },

    pickerStyle: {
        color: '#212223'
        /* backgroundColor: 'green' */
    },

    effectiveDatePickerStyle: {
        color: '#212223',
    },

    txtDefault: {
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        color: '#434646'
    },

    txtDescriptionCard: {
        fontFamily: 'Helvetica-Light',
        fontSize: 14,
        color: '#838383'
    },

    payrollChildProp: {
        flexDirection: 'row',
        height: 47,
        paddingTop: 2,
        paddingLeft: 50,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },

    childPropGroupCont: {
        backgroundColor: 'transparent',
        minHeight: 150,
        flexDirection: 'column'
    },

    childGroupTitleCont: {
        /* paddingTop: 30 */
    },

    txtChildGroupTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 15,
        fontWeight: '500',
        color: '#434646'
    },

    childContentCont: {
        paddingTop: 5,
        paddingLeft: 25,
        flexDirection: 'column'
    },

    childPropCont: {
        paddingTop: 10,
        height: 60,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },

    childPropNameCont: {
        justifyContent: 'center',
        width: 200,
        backgroundColor: 'transparent'
    },

    childPropValueCont: {
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'transparent'
    },

    txtChildStyle: {
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        color: '#434646'
    },
};