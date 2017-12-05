const React = require('react-native');
const { StyleSheet } = React;

export default {
    //Parent Styles
    container: {
        flexDirection: 'row',
        backgroundColor: '#EEB843',
        height: 40,
        
    },

    btnContLeft: {
        flex:0.5, 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        paddingLeft: 40, 
        flexDirection: 'row'
    },

    btnContRight: {
        flex:0.5, 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingRight: 40, 
        flexDirection: 'row'
    },

    iconStyle:{
        marginRight:10
    },

    txtLabel: {
        fontFamily: 'Helvetica-Light',
        fontSize: 12,
        color: '#434646',

    }


}