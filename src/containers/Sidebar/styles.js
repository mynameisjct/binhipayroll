export default {
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },

    header: {
        container: {
            flex: 0,
            backgroundColor: '#EEB843',
            elevation: 5
        },

        content:{
            flexDirection: 'row',
            paddingTop: 30,
            paddingBottom: 25,
        },

        left: {
            paddingRight: 15,
            paddingLeft: 25,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent'
        },

        right: {
            
            flex: 1,
            paddingRight: 40,
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: 'transparent'
        },

        picker: {
            position: 'absolute',
            right:1,
            top: 1,
            paddingTop: 12,
            paddingRight: 12,
            paddingBottom: 12,
            paddingLeft: 12
        }
          
    },

    body: {
        container: {
            flex: 1,
            backgroundColor: '#FFFFFF'
        },

        item: {
            container: {
                flex: 1,
                flexDirection: 'row',
                paddingTop: 15,
                paddingBottom: 15
            },

            left: {
                flex: 0.2,
                paddingLeft: 18,
                justifyContent: 'center',
                alignItems: 'center'
            },

            middle:{
                flex: 0.6,
                paddingLeft: 8,
                justifyContent: 'center',
                alignItems: 'flex-start',
            },

            right: {
                flex: 0.2,
                /* backgroundColor: 'blue', */
                justifyContent: 'center',
                alignItems: 'center'
            },

            specialCol: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },

            specialColLoading: {
                justifyContent: 'center',
                alignItems: 'center'
            },

            active: {
                backgroundColor: 'rgba(0, 0, 0, 0.1);'
            },

            notificationIcon:{
                error: 'red',
                normal: '#838383'
            }
        },
    },

    footer: {
        container: {
            flex: 0,
            backgroundColor: '#FFFFFF',
        },

        bottom: {
            flexDirection: 'row',
        },

        item: {
            flex: 1,
            flexDirection: 'row',
            borderLeftWidth: 1.5,
            borderColor: '#D1D4D6',
            paddingTop: 5,
            paddingBottom: 5,
        },

        icon: {
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
        },

        label: {
            flex: 0.6,
            justifyContent: 'center',
            alignItems: 'flex-start'
        },

        profile: {
            container: {
                flex: 0,
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 10,
                borderTopWidth: 1.5,
                borderBottomWidth: 1.5,
                borderColor: '#D1D4D6',
            },

            icon: {
                flex: 0.24,
                paddingLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
            },

            label: {
                flex: 0.76,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingRight: 15
            }
        }
    },

    textStyles: {
        title: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 17,
            fontWeight: '900',
            color: '#434646'
        },

        navigationLabel: {
            fontFamily: 'Helvetica-Light',
            fontSize: 15,
            fontWeight: '300',
            color: '#434646'
        },
        
        notification: {
            error: {
                fontFamily: 'Helvetica-Light',
                fontSize: 14,
                fontWeight: '500',
                marginRight: 5,
                color: 'red'
            },

            normal: {
                fontFamily: 'Helvetica-Light',
                fontSize: 14,
                fontWeight: '500',
                marginRight: 5,
                color: '#838383'
            }
        },
        
        profileTitle: {
            fontFamily: 'Helvetica-Light',
            fontSize: 14,
            fontWeight: '300',
            color: '#434646'
        },

        profileLabel: {
            fontFamily: 'Helvetica-Light',
            fontSize: 12,
            fontWeight: '300',
            color: '#434646'
        }
    }
}