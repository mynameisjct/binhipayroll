/**************************************************************
 *  FileName:           index.js
 *  Description:        Success Prompt Component
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-11

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SaveHeaderPrompt extends Component{
    _enableSaveBtn = (value) => {
        if(value){
            return({
                color: '#D1D4D6' 
            })
        }
        else{
            return({
                color: '#EEB843'
            })
        }
    }

    render(){
        return(
            <View style={styles.container}>

                <TouchableNativeFeedback
                    onPress={() => {this.props.onFormClose()}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.headerLeft}>
                        <Icon name='md-close' size={30} color='#EEB843'/>
                    </View>
                </TouchableNativeFeedback>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>{this.props.title}</Text>
                </View>

                <TouchableNativeFeedback
                    disabled={this.props.disableSave}
                    onPress={() => {alert('PRESSED!')}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.headerRight}>
                        <Text disabled={this.props.disableSave} style={[styles.txtBtn, this._enableSaveBtn(this.props.disableSave)]}>SAVE</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        )
    }
}