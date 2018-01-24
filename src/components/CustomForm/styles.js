  /**************************************************************
 *  FileName:           styles.js
 *  Description:        Digital Clock Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

import stylesheet, {
    LABEL_COLOR,
    INPUT_COLOR,
    ERROR_COLOR,
    HELP_COLOR,
    BORDER_COLOR,
    DISABLED_COLOR,
    DISABLED_BACKGROUND_COLOR,
    FONT_SIZE,
    FONT_WEIGHT,
    FONT_FAMILY
} from '../../global/globalFormStyle';

export default {
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    contLabel: {
        flex:1,
        paddingBottom: 10
    },

    contInput: {
        flex:1,
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 8,
        height: stylesheet.textbox.normal.height,
        borderColor: BORDER_COLOR,
    },

    textinputField: {
        /* backgroundColor: 'red', */
        flex: 1,
        color: INPUT_COLOR,
        fontSize: FONT_SIZE,
        padding: 8
    },

    contInfoLabel: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },

    contError: {
        flex:1,
        paddingTop: 5,
        paddingLeft: 5
    },
    
    contAddLabel: {
        width: 100,
        alignItems: 'flex-end',
        justifyContent: 'center',
        /* paddingTop: 5, */
        paddingRight: 5,
        height: '100%',
        backgroundColor: 'transparent'
    },

    txtAddLabel: {
        fontSize: 14,
        color: '#EEB843',
        fontWeight: '500',
        textAlignVertical: 'center',
        justifyContent: 'center',
    },

    contIcon: {
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }


};