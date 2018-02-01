import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import Tardiness from '../../tardiness';

export default class TardinessScreen extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={{ flex: 1}}>
                <Tardiness status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}
 