import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import Overtime from '../../Rules/overtime';

export default class OvertimeScreen extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={{ flex: 1}}>
                <Overtime status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}