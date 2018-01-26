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
    BORDER_WIDTH,
    DISABLED_COLOR,
    DISABLED_BACKGROUND_COLOR,
    FONT_SIZE,
    FONT_WEIGHT,
    FONT_FAMILY
} from '../../global/globalFormStyle';

export default {
    container: {
        flexDirection: 'column',
    },

    contLabel: {
    },

    contInput: {
        marginBottom: 7,
    },

    textinputField: {
        flex: 1,
        color: INPUT_COLOR,
        fontSize: FONT_SIZE,
        height: stylesheet.textbox.normal.height,
        borderWidth: BORDER_WIDTH,
        borderRadius: stylesheet.textbox.normal.borderRadius,
        marginBottom: 15,
        paddingVertical: stylesheet.textbox.normal.paddingVertical,
        paddingHorizontal: stylesheet.textbox.normal.paddingHorizontal,
        height: stylesheet.textbox.normal.height,
        borderColor: BORDER_COLOR
    },

    contInfoLabel: {
        marginTop: -10,
        flexDirection: 'row',
        backgroundColor: 'transparent',
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
        width: 36,
        alignItems: 'flex-start',
        justifyContent: 'center'
    }


};