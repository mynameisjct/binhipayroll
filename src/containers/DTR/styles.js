export default {
    container: {
        flex:1
    },

    dividerHeader: {
        height: 80,
        backgroundColor: '#FFFFFF',
        elevation: 5
    },

    dividerBody: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

    header: {
        container: {
            flex: 1,
            flexDirection: 'row'
        },

        contLeft: {
            width: 80,
            /* backgroundColor: 'green' */
        },

        contRight: {
            width: 80,
            /* backgroundColor: 'green', */
            alignItems: 'flex-end',
            paddingTop: 10,
            paddingRight: 15
        },

        contCenter: {
            flex: 1,
            /* backgroundColor: 'indigo' */
        },

        contPeriodDescription: {
            flex: 0.45,
            /* backgroundColor: 'orange', */
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        
        contSchedule: {
            flex: 0.55,
            /* backgroundColor: 'yellow', */
            flexDirection: 'row'
        },

        contPeriod: {
            flex: 1,
            height: '70%',
            justifyContent:'center',
            alignItems: 'flex-end',
            paddingRight: 15
        },

        contDivider: {
            width: 1,
            height: '70%',
            backgroundColor: '#434646',
        },

        contPayroll: {
            flex: 1,
            height: '70%',
            justifyContent:'center',
            paddingLeft: 15,
            alignItems: 'flex-start'
        },

        txtTitle: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 16,
            fontWeight: '500',
            color: '#EEB843'
        },
        
        txtSchedule: {
            fontFamily: 'Helvetica-Light',
            fontSize: 14,
            color: '#434646'
        }
    },

    body: {
        container: {
            
        }
    },
    
    itemStyle: {
        container: {
            backgroundColor: '#FFF',
            flex: 1,
            borderRadius: 5,
            padding: 15,
            marginRight: 10,
            marginTop: 17
        },

        propPlaceholder: {
            flex: 1,
            flexDirection: 'column',
            borderBottomWidth: 1,
            borderColor: '#D1D4D6',
            padding:10,
            minHeight: 50,
            backgroundColor: 'transparent'
        },

        colName: {
            flex: 0.3,
            backgroundColor: 'transparent',
            justifyContent: 'center'
        },

        colDivider: {
            flex: 1,
        },

        contDividerContent: {
            flex: 1,
        },

        colVal: {
            flex: 0.2,
            backgroundColor: 'transparent',
            justifyContent: 'center'
        },

        colBtn: {
            flex: 0.5,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center'
        },

        row: {
            flex: 1,
            flexDirection: 'row'
        },

        txtRemarks: {
            fontFamily: 'Helvetica-Light',
            fontStyle: 'italic',
            fontSize: 12,
            color: '#838383',
            fontWeight: '100'
        },

        txtName: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 14,
            color: '#434646',
            fontWeight: '300'
        },

        txtValue: {
            fontFamily: 'Helvetica-Light',
            fontSize: 14,
            color: '#434646',
            fontWeight: '400'
        },

        btn: {
            container: {
                flex: 1,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                maxHeight: 30,
                minWidth: 130,
                backgroundColor: '#EEB843',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                elevation: 3
            },

            txtLabel: {
                fontSize: 11,
                color: '#FFFFFF',
                fontFamily: 'Helvetica-Light',
                fontWeight: '500'
            }
        }
    },

    formModal: {
        container: {
            /* flex: 1, */
            paddingTop: 15,
            paddingBottom: 15,
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 400,
            minWidth: 400
        },

        contContent: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            paddingTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 30
        }


    },

    emptyStyle: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
}