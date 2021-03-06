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
        width: 85,
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
        fontSize: 14,
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
        fontSize: 15,
        color: '#434646'
    },

    txtDefault: {
        fontFamily: 'Helvetica-Light',
        fontSize: 14,
        color: '#434646'
    },

    txtDefaultTime:{
        textDecorationLine: 'underline',
        fontFamily: 'Helvetica-Light',
        fontSize: 14,
        color: '#434646'
    },

    defaultTimeRow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },

    defaultTimeLeft: {
        width: 80
    },

    defaultTimeRight: {
    },

    btnRightCont: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
        
    },

    btnSave: {
        width: 120,
        height: 35,
        backgroundColor: '#4CAF50',
        borderRadius: 100,
        borderWidth: 0.7,
        borderColor: '#D1D4D6',
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnCancel: {
        width: 100,
        height: 35,
        backgroundColor: '#D75450',
        borderRadius: 100,
        borderWidth: 0.7,
        borderColor: '#D1D4D6',
        justifyContent: 'center',
        alignItems: 'center'
    },

    txtBtn: {
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        color: '#fff'
    },
    
    //******************BreakTime**************//
    containerPlaceholder: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },

    breakCont: {
        flex: 1,
        flexDirection: 'column'
    },

    leaveCont: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 30
    },

    benefitsCont: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 30,
        maxWidth: 600
    },

    breakTimeDetailsCont: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 40,
        backgroundColor: 'transparent'
    },

    breakNameCont: {
        flex: 0.2,
        minWidth: 130,
        maxWidth: 130,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    leaveNameCont: {
        flex: 0.2,
        minWidth: 200,
        maxWidth: 200,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    benefitsNameCont: {
        flex: 0.2,
        minWidth: 180,
        maxWidth: 180,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    leaveDetailsCont: {
        flex: 0.2,
        minWidth: 160,
        minWidth: 160,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

    benefitsDetailsCont: {
        flex: 0.2,
        minWidth: 180,
        minWidth: 180,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

    benefitsAmountCont: {
        flex: 0.2,
        minWidth: 150,
        minWidth: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

    benefitsDeleteCont: {
        flex: 0.2,
        minWidth: 100,
        minWidth: 100,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
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

    txtBreakName: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 14,
        fontWeight: '100',
        paddingRight: 20,
        paddingLeft: 20,
        color: '#434646'
    },

    //******************Payroll**************//
    contentCont: {
        flexDirection: 'row',
        minHeight: 100,
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

    titleCont: {
        backgroundColor: 'transparent',
        width: 150,
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
        height: 40,
        width: 120,
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: '#434646',
        justifyContent: 'center'

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
        fontSize: 16,
        fontWeight: '500'
    },

    pickerStyle: {
        color: '#434646'
        /* backgroundColor: 'green' */
    },

    effectiveDatePickerStyle: {
        color: '#212223',
    },

    txtClickable: {
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        color: '#434646',
        paddingLeft: 15, 
        height: '100%',
        textAlignVertical: 'center'

    },

    adjustChildProp: {
        marginLeft: -20,
    },

    payrollChildProp: {
        flexDirection: 'row',
        height: 50,
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

    datePickerCont: {
        flex: 1,
        width: 160,
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: '#505251',
        justifyContent: 'center',
        alignItems: 'center'
    },

    txtDisabledValue: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 15,
        color: '#434646',
        paddingLeft: 15
    },
    
    txtSwitchViewOnly: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 15,
        color: '#434646',
        paddingLeft: 15,
        fontWeight: '500'
    }
    
    

    
    
}