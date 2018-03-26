const React = require('react-native');
const { StyleSheet } = React;

export default {
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#D1D4D6'
    },

    headerStyles: {
        container: {
            flexDirection: 'row',
            height: 78,
            borderBottomWidth: 0.7,
            borderColor: '#D1D4D6',
            backgroundColor: '#ECF0F1',
            elevation: 3
        },

        content: {
            flex: 1,
            borderRightWidth: 0.7,
            borderColor: '#D1D4D6',
            padding: 5,
            flexDirection: 'row',
            backgroundColor: '#FFF'
        },

        left: {
            paddingLeft: 20,
            justifyContent: 'center',
            alignItems: 'flex-start'
        },
        
        right: {
            flex: 1,
            paddingLeft: 15,
            justifyContent: 'center',
            alignItems: 'flex-start'
        }
    },

    detailsStyles: {
        container: {
            flexDirection: 'column',
            margin: 10
        },

        lowerBlock: {
            flex: 1,
            flexDirection: 'row',
        }
    },

    todayStyles: {
        container: {
            padding: 30,
            paddingTop: 15,
            backgroundColor: '#FFFFFF',
            borderRadius: 0,
            elevation: 3
        },

        flatListStyle: {
            paddingBottom: 15
        }  
    },

    todayItemStyles: {
        container: {
            height: 110,
            width: 170,
            marginRight: 10,
            marginLeft: 10,
            flexDirection: 'column'
        },

        upperBlock: {
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            backgroundColor: '#FFFFFF',
            flexDirection: 'column'
        },

        statsDiv: {
            flex: 2,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingLeft: 25,
            paddingBottom: 10
        },

        iconDiv: {
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 15,
            paddingBottom: 20
        },


        lowerBlock: {
            height: 25,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },

    todayHeaderStyles: {
        container: {
            height: 50,
            flexDirection: 'row'
        },

        left: {
            paddingLeft: 15,
            justifyContent: 'center',
            alignItems: 'flex-start'
        },

        right: {
            flex: 1,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'flex-start'
        }
    },

    payrollStatsStyles: {
        container:{
            flex: 1,
            marginTop: 10,
            padding: 30,
            paddingTop: 15,
            backgroundColor: '#FFFFFF',
            borderRadius: 0,
            elevation: 3
        }
    },

    textStyles: {
        companyName: {
            fontSize: 15,
            color: '#434646',
            fontFamily: 'Helvetica-Bold'
        },

        headerLabel: {
            fontSize: 13,
            color: '#838383',
            fontStyle: 'italic',
            fontFamily: 'Helvetica-Bold'
        },

        headerValue: {
            fontSize: 16,
            color: '#434646',
            fontFamily: 'Helvetica-Bold'
        },

        groupTitle: {
            fontSize: 23,
            fontWeight: '500',
            color: '#434646',
            fontFamily: 'Helvetica-Bold'
        },

        groupDescription: {
            fontSize: 10,
            color: '#838383',
            fontFamily: 'Helvetica-Light'
        },

        cardLabel: {
            fontSize: 11,
            fontWeight: '500',
            color: '#FFF',
            fontFamily: 'Helvetica-Light'
        },

        cardStats: {
            fontSize: 17,
            color: '#434646',
            fontFamily: 'Helvetica-Light'
        }
    },
    
}
   