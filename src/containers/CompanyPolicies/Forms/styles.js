const React = require('react-native');
const { StyleSheet } = React;

export default {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    headerCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 55,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 3,
  },

    formCont: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
  },

    fieldCont: {
    },

    timeFieldCont: {
        backgroundColor: 'transparent',
        height: 80,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        borderBottomWidth: 1.7,
        borderColor: '#D1D4D6'
    },

    txtNameLabel: {
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        width: 100,
        color: '#838383'

    },

    txtLabel: {
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        width: 100,
        marginBottom: 22,
        color: '#838383'
    },
    
    txtTime: {
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        width: 100,
        marginBottom: 2,
        color: '#434646'

    },

    textinputField:{
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        color: '#434646'
    }
}