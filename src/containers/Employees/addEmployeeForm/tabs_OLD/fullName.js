import React, { Component } from 'react';
import {
    View,
    TextInput
} from 'react-native';

import {FormCard} from '../../../../components/CustomCards';

export default class FullName extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:''
        }
    }

    _onSubmit = () => {
        console.log('HELLO!');
    }
    
    render(){
        return(
            <View style={{ flex: 1}}>
                <FormCard errorMessage='TEST' onSubmit={this._onSubmit} btnLabel='Next'>
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='words'
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                </FormCard>
            </View>
        )
    }
}