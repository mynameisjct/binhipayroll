import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import Undertime from '../../undertime';

export default class UndertimeScreen extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={{ flex: 1}}>
                <Undertime status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}