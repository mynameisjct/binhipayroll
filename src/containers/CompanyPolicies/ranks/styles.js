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

    level2Styles: {
        txt: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 14,
            color: '#434646',
            paddingLeft: 15,
            paddingRight: 15,
            /* backgroundColor: 'red', */
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
            backgroundColor: '#fff',
            margin: 30,
            borderRadius: 15,
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
            flex: 1
        },

        btnContLeft: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            borderWidth: 1,
            borderColor: '#D1D4D6',
            borderBottomLeftRadius: 15,
        },

        btnContRight: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            borderWidth: 1,
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
            width: '100%',
            backgroundColor: 'red'
        }
    },

    leavesTable: {
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
    }
    
}