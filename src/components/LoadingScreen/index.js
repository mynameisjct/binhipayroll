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
    ActivityIndicator
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LoadingScreen extends Component{
    render(){
        return(
            <Modal 
                animationType="fade"
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => {alert("Modal has been closed.")}}>
            
                <View style={styles.container}>
                    <View style={styles.logoCont}>
                    </View>
                    <View style={styles.messageCont}>
                        <Text style={styles.txtMsg}> Please wait. Connecting to server...</Text>
                    </View>
                    <ActivityIndicator
                        animating = {true}
                        color = '#EEB843'
                        size = "large"
                        style = {styles.activityIndicator}/>
                </View>
            </Modal>

        );
    }
}