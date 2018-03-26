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
    listStyles: {
        container: {
            flex: 1,
            width: 270,
            flexDirection: 'column'
        },

        listGroup: {
            flex: 1
        }
    },

    itemStyles: {
        container: {
            padding: 15,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            borderBottomWidth: 1.5,
            borderColor: '#383a3a'
        },

        left: {
            justifyContent: 'center',
            alignItems: 'center'
        },

        right: {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 15,
            paddingRight: 15
        }
    },

    headerStyles: {
        container: {
            height: 50,
            flexDirection: 'row',
            backgroundColor: '#EEB843',
            elevation: 3
        },
        
        left: {
            paddingLeft: 18,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start'
        },

        right: {
            paddingRight: 10,
            justifyContent: 'center',
            alignItems: 'flex-end'
        },

        notificationCount: {
            normal: {
                padding: 10,
                borderRadius: 100,
                elevation: 5,
                backgroundColor: '#FFF'
            },

            error: {
                paddingTop: 5,
                paddingBottom: 7,
                paddingLeft: 11,
                paddingRight: 11,
                borderRadius: 100,
                elevation: 5,
                backgroundColor: '#f2504b'
            }
        }
    },

    groupLabelStyles: {
        container: {
            backgroundColor: '#D1D4D6',
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 18,
            paddingRight: 18,
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#FFF'
        },
    },

    textStyles: {
        title: {
            color: '#434646',
            fontSize: 16,
            fontWeight: '500',
            fontFamily: 'Helvetica-Bold'
        },

        groupLabel: {
            color: '#434646',
            fontSize: 13,
            fontWeight: '300',
            fontFamily: 'Helvetica-Light'
        },

        notification: {
            error: {
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: '300'
            },
            
            details: {
                color: '#FFFFFF',
                fontSize: 13,
                fontFamily: 'Helvetica-Light'
            }
        },
    }
}
   