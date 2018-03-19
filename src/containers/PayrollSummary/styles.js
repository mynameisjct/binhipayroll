const React = require('react-native');
const { StyleSheet } = React;

export default {
    container: {
        flex: 1,
        flexDirection: 'row',
    },

    summaryStyles: {
        container: {
            flex: 1,
            flexDirection: 'column',
            borderRightWidth: 1,
        },

        header: {
            container: {
                height: 50,
                flexDirection: 'row',
                backgroundColor: '#EEB843',
                elevation: 5,
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
                backgroundColor: '#FFFFFF',
            },
        },

        footer: {
            container: {
                height: 37,
                flexDirection: 'column',
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
                height: 50,
                flexDirection: 'row',
                backgroundColor: '#EEB843',
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
                backgroundColor: '#D1D4D6'
            },

            listComponent: {
                paddingBottom: 12,
                paddingTop: 5
            },

            placeholder: {
                marginTop: 15,
                marginRight: 15,
                marginLeft: 15,
                elevation: 5,
                paddingTop: 15,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 10,
                borderLeftWidth: 15,
                borderColor: 'green',
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
                height: 37,
                flexDirection: 'column',
                backgroundColor: '#434646'
            }
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
            fontSize: 12,
            color: '#505251'
        },

        summary: {
            fontSize: 14,
            color: '#434646'
        },

        summaryBold: {
            fontSize: 14,
            color: '#434646',
            fontWeight: '800',
        },
    }
}
   