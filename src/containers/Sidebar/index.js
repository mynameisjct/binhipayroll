/**************************************************************
 *  FileName:           index.js
 *  Description:        Sidebar
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class EmpeSidebarSidebar extends Component {
    render(){
        const { navigate, state } = this.props.navigation;
        return(
            <View style={{flex:1, backgroundColor: '#212223', height: 1000}}>
                <Text>This will display Sidebar</Text>
            </View>
        );
    }
}

