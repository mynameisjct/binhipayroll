import React, { Component } from 'react';
import {
    View,
    Text, 
    TouchableNativeFeedback,
} from 'react-native';
import * as PromptScreen from '../ScreenLoadStatus';

import styles from './styles';

export default class GenericContainer extends Component {
    
    _onRefresh = () => {
        this.props.onRefresh();
    }

    render(){
        if(this.props.status[0] == 0){
            return <PromptScreen.PromptError title={this.props.title} onRefresh={this._onRefresh}/>;
        }
        else if(this.props.status[0] == 1){
            return (
                <View style={[styles.container, this.props.containerStyle ? this.props.containerStyle : {}]}>
                    { this.props.children }
                </View>
            );
        }
        else{
            return <PromptScreen.PromptLoading title={this.props.title}/>;
        }
    }
}