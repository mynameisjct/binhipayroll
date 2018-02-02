import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import Leaves from '../../leaves';

export default class LeavesScreen extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={{ flex: 1}}>
                <Leaves status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}