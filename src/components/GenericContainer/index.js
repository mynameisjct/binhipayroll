import React, { Component } from 'react';
import {
    View,
    Text, 
    TouchableNativeFeedback,
    ScrollView,
    RefreshControl
} from 'react-native';
import * as PromptScreen from '../ScreenLoadStatus';
import MessageBox from '../MessageBox';

import styles from './styles';

export default class GenericContainer extends Component {
    state = {
        refreshing: false
    }

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
                    <MessageBox
                        promptType={this.props.msgBoxType || ''}
                        show={this.props.msgBoxShow || false}
                        onYes={() => this.props.msgBoxOnYes(this.props.msgBoxParam)}
                        onClose={() => this.props.msgBoxOnClose()}
                        onWarningContinue={() => this.props.msgBoxOnContinue(this.props.msgBoxParam)}
                        message={this.props.msgBoxMsg || ''}
                    />

                    <PromptScreen.PromptGeneric 
                        show= {this.props.loadingScreenShow || false} 
                        title={this.props.loadingScreenMsg || ''}
                    />
                    
                </View>
            );
        }
        else{
            return <PromptScreen.PromptLoading title={this.props.title}/>;
        }
    }
}