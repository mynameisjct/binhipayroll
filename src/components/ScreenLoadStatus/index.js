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
    ActivityIndicator,

} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';


const dMinOpacity = 0.1;
const dMaxOpacity = 1;

export class PromptLoading extends Component{
    render(){
        return(
            <View style={styles.loadingCont}>
                <Text style={styles.txtMsg}>{this.props.title}</Text>
                <ActivityIndicator
                    animating = {true}
                    color = '#EEB843'
                    size = "large"/>
            </View>

        );
    }
}

export class PromptError extends Component{
    render(){
        return(
            <View style={styles.errorCont}>
                <View style={styles.placeHolderErrorMessage}>
                    <Text style={styles.txtMsgError}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

export class PromptGeneric extends Component{
    render(){
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', flex: 1, zIndex: 100, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8);'}}>
                <ActivityIndicator
                    animating = {this.props.show}
                    color = '#EEB843'
                    size = "large"
                    style = {styles.activityIndicator}/>
                <Text style={{color: '#fff'}}>{this.props.title}</Text>
            </View>
        )
    }
}