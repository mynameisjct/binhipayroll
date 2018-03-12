
export default {
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column'
    },

    content: {
        container: {
            flex: 1,
            flexDirection: 'row'
        },

        placeholder: {
            flex: 1,
            flexDirection: 'column',
            borderTopWidth: 0.7,
            borderRightWidth: 0.7,
            borderColor: '#838383'
        }
    },

    navigator: {
        container: {
            height: 58,
            flexDirection: 'row',
            elevation: 2,
            backgroundColor: '#D1D4D6'
        },

        left: {
            flex: 1,
            /* backgroundColor: 'red' */
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 20
        },

        right: {
            flex: 1,
            /* backgroundColor: 'orange', */
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: 15
        }
    },

    header: {
        container: {
            /* backgroundColor: 'orange', */
            flexDirection: 'row'
        },

        left: {
            width: '35%',
            /* backgroundColor:'blue', */
            flexDirection: 'row',
            /* borderRightWidth: 0.7,
            borderColor: '#838383', */
            padding: 10
        },

        right: {
            width: '65%',
            /* backgroundColor:'indigo', */
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10
        },

        iconCont: {
            justifyContent: 'center',
            alignItems: 'center',
            /* borderWidth: 1, */
            paddingRight: 8
        },

        generalInfoCont: {
            width: '100%',
            flexDirection: 'row',
            /* backgroundColor: 'green' */
        },

        titleCont: {
            flex: -1,
            /* backgroundColor: 'red', */
            flexDirection: 'column',
            justifyContent: 'center'
        },
        
        addressCont: {
        },

        paramsList: {
            flexDirection: 'column',
            /* borderWidth: 1, */
            width: '50%'
        },

        param: {
            flexDirection: 'row',
            /* backgroundColor: 'orange' */
        },

        label: {
            width: '40%',
            /* borderWidth: 1, */
            paddingLeft: 10,
        },

        value: {
            width: '60%',
            /* borderWidth: 1, */
        }
        
    },

    title: {
        container: {
            padding: 10,
            /* backgroundColor:'yellow', */
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0.7,
            borderColor: '#838383'
        }
    },
    
    body: {
        container: {
            flex: 1,
            /* backgroundColor: 'green', */
            flexDirection: 'column'
        },

        paramsList: {
            flex: 1,
            padding: 13
        },

        params: {
            /* flex: 1, */
            paddingBottom: 7,
            flexDirection: 'row',
            /* borderWidth: 1, */
            borderColor: '#FFF'
        },

        paramsArg: {
            flex: 1,
            /* borderWidth: 1, */
            justifyContent: 'center',
            /* borderColor: 'blue' */
        },

        paramsLeftMost: {
            flex: 1.5,
            alignItems: 'flex-start'
        },

        paramsRightMost: {
            flex: 1.2,
            alignItems: 'flex-end'
        },

        paramsCenter: {
            alignItems: 'center'
        }
    },

    system: {
        break: {
            height: 15,
            /* backgroundColor: 'blue' */
        },

        div: {
            height: 1,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: '#838383'
        },

        footer: {
            container:{
                /* position: 'absolute', */
                /* backgroundColor:'red', */
                height: 75,
                /* right: 0,
                left: 0,
                bottom: 0, */
                flexDirection: 'column'
            },
            title: {
                flex: 0.7,
                backgroundColor: '#D1D4D6',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#505251',
                justifyContent: 'center',
                alignItems: 'center'
            
            },
            value: {
                flex: 1,
                /* backgroundColor: 'orange', */
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
    },

    textStyles: {
        companyName: {
            fontSize: 14,
            fontFamily: 'Helvetica-Bold',
            color: '#434646',
            fontWeight: '500'
        },
        
        address: {
            fontSize: 11,
            fontFamily: 'Helvetica-Light',
            color: '#838383'
        },

        label: {
            fontSize: 12,
            fontFamily: 'Helvetica-Light',
            color: '#434646'
        },

        value: {
            fontSize: 12,
            fontFamily: 'Helvetica-Light',
            color: '#434646'
        },

        details: {
            fontSize: 12,
            fontFamily: 'Helvetica-Light',
            color: '#434646'
        },

        detailsHeader: {
            fontSize: 12,
            fontFamily: 'Helvetica-Light',
            color: '#434646',
            fontWeight: '500'
        },

        footerTitle: {
            fontSize: 13,
            fontFamily: 'Helvetica-Light',
            color: '#434646',
            fontWeight: '500'
        },

        footerValue: {
            fontSize: 14,
            fontFamily: 'Helvetica-Light',
            color: '#434646'
        },

        cardTitle: {
            fontSize: 17,
            fontFamily: 'Helvetica-Bold',
            color: '#434646'
        }
    }
}