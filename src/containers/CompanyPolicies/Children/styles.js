/**************************************************************
 *  FileName:           styles.js
 *  Description:        Company Policy Children Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {
    container: {
        flex:1,
        flexDirection: 'row',
    },

    tableCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    categoryCont: {
        width: 100,
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },

    categoryPlaceholder: {
        height: 40, 
        alignItems: 'flex-end', 
        justifyContent: 'center'
    },

    detailsCont: {
        flexDirection: 'row'
    },

    dailyCont: {
        flexDirection: 'column',
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },

    dailyPlaceholder: {
        flex: 1,
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    
    txtTime: {
        textDecorationLine: 'underline'
    }

    


}