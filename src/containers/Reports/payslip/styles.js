
export default {
    container: {
        flex: 1,
        backgroundColor: 'red',
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
            borderWidth: 1
        }
    },

    header: {
        container: {
            backgroundColor: 'orange',
            flexDirection: 'row'
        },

        left: {
            maxWidth: '25%',
            minWidth: '25%',
            backgroundColor:'blue',
            flexDirection: 'row',
        },

        right: {
            width: '75%',
            backgroundColor:'indigo',
            flexDirection: 'row',
            justifyContent: 'center'
        },

        iconCont: {
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            padding: 5
        },

        generalInfoCont: {
            maxWidth: '80%',
            minWidth: '80%',
            flexDirection: 'column',
            backgroundColor: 'green',
            justifyContent: 'center'
        },

        titleCont: {
            backgroundColor: 'red'
        },
        
        addressCont: {
        },

        paramsList: {
            flexDirection: 'column',
            borderWidth: 1,
            width: '50%'
        },

        param: {
            flexDirection: 'row',
            backgroundColor: 'orange',
            paddingTop: 5
        },

        label: {
            width: '40%',
            borderWidth: 1,
            paddingLeft: 10,
            paddingBottom: 5
        },

        value: {
            width: '60%',
            borderWidth: 1,
            paddingBottom: 5
        }
        
    },

    title: {
        container: {
            padding: 10,
            backgroundColor:'yellow',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    
    body: {
        container: {
            flex: 1,
            backgroundColor: 'green',
            flexDirection: 'column'
        },

        paramsList: {
            flex: 1,
            padding: 7
        },

        params: {
            /* flex: 1, */
            paddingBottom: 7,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#FFF'
        },

        paramsArg: {
            flex: 1,
            borderWidth: 1,
            justifyContent: 'center',
            borderColor: 'blue'
        },

        paramsLeftMost: {
            flex: 2,
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
            backgroundColor: 'blue'
        },

        div: {
            height: 1.5,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: '#838383'
        },

        footer: {
            container:{
                position: 'absolute',
                backgroundColor:'red',
                height: 120,
                right: 0,
                left: 0,
                bottom: 0,
                flexDirection: 'column'
            },
            title: {
                flex: 0.7,
                backgroundColor: 'yellow',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#838383',
                justifyContent: 'center',
                alignItems: 'center'
            
            },
            value: {
                flex: 1,
                backgroundColor: 'orange',
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
            fontSize: 13,
            fontFamily: 'Helvetica-Light',
            color: '#838383'
        },

        value: {
            fontSize: 13,
            fontFamily: 'Helvetica-Light',
            color: '#434646'
        }
    }
}