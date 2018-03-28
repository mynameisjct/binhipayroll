const React = require('react-native');
const { StyleSheet } = React;

export default {
    container: {
        flex: 1,
        flexDirection: 'row'
    },

    summaryStyles: {
        container: {
            flex: 1,
            flexDirection: 'column'
        },

        header: {
            container: {
                height: 55,
                flexDirection: 'row',
                backgroundColor: '#fcfcfc',
                elevation: 5,
                borderRightWidth: 0.7,
                borderColor: '#D1D4D6'
            },

            center: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            },

            icon: {
                justifyContent: 'center',
                alignItems: 'center'
            },

            title: {
                paddingLeft: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }
        },

        body: {
            container: {
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
                borderColor: '#D1D4D6'
            },

            content: {
                flex: 1,
                backgroundColor: '#FFFFFF',
                flexDirection: 'column',
            },
            upperBlock: {
                elevation: 1,
                padding: 40,
                paddingBottom: 0,
                flexDirection: 'column'
            },

            title: {
                marginBottom: 10
            },

            details: {
                flexDirection: 'row'
            },

            lowerBlock: {
                elevation: 1,
                padding: 30,
                paddingTop: 0,
                flexDirection: 'column'
            },

            cardBody: {
                content: {
                    /* flex: 1, */
                    paddingTop: 5,
                    backgroundColor: 'transparent',
                    flexDirection: 'row'
                },
                
                label: {
                    flex: 1,
                    backgroundColor: 'transparent',
                    paddingLeft: 25
                },

                value:{
                    backgroundColor: 'transparent',
                    flex: 1, 
                    alignItems: 'flex-start'
                }
            },

            horizontalScrollPlaceHolder: {
                backgroundColor: 'red'
            },

            scrollViewPlaceholder: {

            }
        },

        footer: {
            container: {
                flexDirection: 'column',
                backgroundColor: 'transparent'
            },
            content: {
                backgroundColor: '#FFF',
                paddingBottom: 20,
                paddingTop: 15,
                height: 130
            },
            
            upperBlock: {
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'transparent'
            },

            btn: {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
                borderRadius: 20,
                elevation: 3,
                margin: 7,
                width: 160,
                height: 37
            },

            btnPost: {
                backgroundColor: 'green',
            },

            btnCancel: {
                backgroundColor: 'gray',
            },

            btnRegenerate: {
                backgroundColor: '#EEB843',
            },

            lowerBlock: {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent'
            }
        }
    },

    listStyles: {
        container: {
            flex: 1,
            flexDirection: 'column',
            elevation: 3
        },

        header: {
            container: {
                height: 55,
                flexDirection: 'row',
                backgroundColor: '#fcfcfc',
                elevation: 5
            },

            center: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            },

            icon: {
                justifyContent: 'center',
                alignItems: 'center'
            },

            title: {
                paddingLeft: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }
        },

        body: {
            container: {
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'transparent'
            },

            listComponent: {
                paddingBottom: 10,
                paddingTop: 7.5
            },

            placeholder: {
                marginTop: 7.5,
                marginRight: 15,
                marginLeft: 15,
                marginBottom: 7.5,
                elevation: 3,
                paddingTop: 15,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 10,
                borderLeftWidth: 20,
                borderColor: 'yellow',
                backgroundColor: '#FFFFFF'
            },

            cardHeader: {
                container: {
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'transparent'
                },

                left: {
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row'
                },

                right: {
                    backgroundColor: 'transparent',
                    alignItems: 'flex-end'
                },

                icon: {
                    justifyContent: 'center',
                    alignItems: 'center'
                },

                title: {
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }
            },

            cardBody: {
                container: {
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'column',
                    paddingTop: 10,
                    paddingLeft: 5,
                    paddingRight: 13
                },

                content: {
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row'
                },
                
                label: {
                    flex: 1,
                    backgroundColor: 'transparent'
                },

                value:{
                    backgroundColor: 'transparent'
                }
            }
        },

        footer: {
            container: {
                height: 35,
                flexDirection: 'row',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            left: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 15
            },
            right: {
                paddingRight: 15,
                flexDirection: 'row'

            },
            label: {
                justifyContent: 'center',
                paddingRight: 5
            },
            box:{
                justifyContent: 'center',
            }
        }
    },

    form: {
        container: {
            paddingTop: 30,
            paddingBottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
        },

        content: {
            flex: 1,
            marginLeft: 15,
            marginRight: 15,
            borderWidth: 0.7,
            borderColor: '#D1D4D6'
        },

        contentFullscreen: {
            flex: 1,
            borderWidth: 0.7,
            borderColor: '#D1D4D6'
        }
        
    },

    textStyles: {
        title: {
            fontSize: 15,
            color: '#333333',
            fontWeight: '500'
        },

        name: {
            fontSize: 15,
            color: '#434646',
            fontWeight: '500'
        },

        description: {
            fontSize: 13,
            color: '#505251'
        },

        summary: {
            fontSize: 13.5,
            color: '#434646'
        },

        summaryBold: {
            fontSize: 13.5,
            color: '#434646',
            fontWeight: '800',
        },

        footerLabels: {
            fontSize: 12,
            color: '#FFF'
        },

        groupTitle: {
            fontSize: 14,
            color: '#434646',
            fontWeight: '500',
        },

        groupLabel: {
            fontSize: 14,
            color: '#FFFFFF'
        },

        btnText: {
            fontSize: 13,
            color: '#FFFFFF'
        },

        btnText: {
            fontSize: 13,
            color: '#FFFFFF'
        },

        btnTextError: {
            fontSize: 13,
            color: '#ff4d4d'
        }
    }
}
   