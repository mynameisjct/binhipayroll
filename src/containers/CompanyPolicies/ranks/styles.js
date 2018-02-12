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
        flex:1
    },

    contContent: {
        flex: 1,
        flexDirection: 'column'
    },

    contForm: {
        height: 165,
        backgroundColor: 'transparent'
    },

    contRootTabs: {
        flex: 1,
        backgroundColor: 'transparent'
    },

    contEmpty: {
        flex: 1,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },

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
        cont: {
            width: 200
        }
    },

    modalRules: {
        container: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
        innerCont: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#f9f9f9',
            margin: 30,
            borderRadius: 15,
            elevation: 20,
        },

        titleCont: {
            backgroundColor: '#F2F1EF',
            borderWidth: 1,
            borderColor: '#D1D4D6',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 60,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
        },

        footerCont: {
            backgroundColor: '#F2F1EF',
            flexDirection: 'row',
            height: 50,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
        },

        txtHeader: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 16,
            color: '#434646',
            fontWeight: '500',
            paddingLeft: 25,
            paddingRight: 25
        },

        contentCont: {
            flex: 1,
            backgroundColor: '#FFF'
        },

        btnContLeft: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            borderWidth: 0.7,
            borderColor: '#D1D4D6',
            borderBottomLeftRadius: 15,
        },

        btnContRight: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            borderWidth: 0.7,
            borderColor: '#D1D4D6',
            borderBottomRightRadius: 15,
        },

        btnContRight: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            borderWidth: 1,
            borderColor: '#D1D4D6',
            borderBottomRightRadius: 15,
        },

        txtBtn: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 17,
            textAlignVertical: 'center'
        },

        contTextWrapper: {
            flex: 1,
            height: '100%',
            width: '100%'
        }
    },

    /* leavesTable: {
        container: {
            flex: 1,
            marginTop: 10,
            marginLeft: 33,
            marginBottom: 10
        },
        
        hearderCont: {
            flex: 1,
            flexDirection: 'row',
            minHeight: 40,
            backgroundColor: 'transparent'
        },

        breakHeaderBorder: {
            borderBottomWidth: 1,
            borderColor: '#D1D4D6'
        },

        nameCont: {
            flex: 0.2,
            minWidth: 200,
            maxWidth: 200,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },

        txtName: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 14,
            fontWeight: '100',
            paddingRight: 20,
            paddingLeft: 20,
            color: '#434646'
        },

        detailsCont: {
            flex: 0.2,
            minWidth: 160,
            minWidth: 160,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center'
        },

        txtDefault: {
            fontFamily: 'Helvetica-Light',
            fontSize: 14,
            color: '#434646'
        },

        deleteCont: {
            flex: 0.2,
            minWidth: 130,
            maxWidth: 130,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'flex-start',
        }
    } */
    leavesTable: {
        container: {
            marginLeft: 50,
            marginTop: 15,
            width: 600
        },

        head: { 
            height: 40, 
            backgroundColor: '#ECF0F1'
        },

        border: {
            borderWidth: 0.7, 
            borderColor: '#D1D4D6'
        },

        text: { 
            header:{
                fontFamily: 'Helvetica-Light',
                fontSize: 14,
                color: '#434646',
                textAlign: 'center',
                fontWeight: '500'
            },
            content:{
                fontFamily: 'Helvetica-Light',
                fontSize: 14,
                color: '#434646',
                textAlign: 'center',
                padding: 8
            }
        },

        row: { 
            minHeight: 30,
            borderWidth:0
        },

        contDeleteBtn: {
            alignItems: 'center',
            justifyContent: 'center'
        },

        contAddBtn: {
            height: 40,
            marginTop: 10,
            alignItems: 'flex-start',
            paddingLeft: 15
        },

        addBtn: {
            
            borderRadius: 15,
            width: 160,
            backgroundColor: '#DADFE1',
            elevation: 3,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5
        },

        txtBtn: {
            fontFamily: 'Helvetica-Light',
            fontSize: 12,
            color: '#434646',
            textAlign: 'center'
        },

        emptyLeavesBtn: {
            height: 25,
            borderRadius: 15,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: '#DADFE1',
            elevation: 3,
            alignItems: 'center',
            justifyContent: 'center'
        },

        emptyContAddBtn: {
            height: 40,
            marginTop: 15,
            marginBottom: 30,
            alignItems: 'center'
        },
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
    
    
}