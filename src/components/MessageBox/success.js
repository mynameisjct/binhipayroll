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
    TouchableOpacity
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ErrorPrompt extends Component{
    constructor(props){
        super(props);
        this.state = {
            _strTitle: '',
            _strHeaderColor: '',
            _strIcon: ''
        }
    }

    componentWillMount()
    {
        switch (this.props.type.toUpperCase()){
            case 'SUCCESS':
                this.setState({
                    _strHeaderColor: '#2C5C36',
                    _strTitle: 'Success',
                    _strIcon: 'md-checkmark'
                });
                break;

            case 'ERROR':
                this.setState({
                    _strHeaderColor: '#D75450',
                    _strTitle: 'Error',
                    _strIcon: 'ios-close-circle-outline'
                });
                break;
            case 'WARNING':
                this.setState({
                    _strHeaderColor: '#E68A00',
                    _strTitle: 'Warning',
                    _strIcon: 'ios-warning-outline'
                });
                break;
                
            default: 
                this.setState({
                    _strHeaderColor: '#FFF',
                    _strTitle: 'UNHANDLED',
                });
        }
    }

    themeColor = (promptType) => {
        return {
            backgroundColor: this.state._strHeaderColor
        }
    }

    renderButtons(){
        switch (this.props.type.toUpperCase()){
            case 'SUCCESS':
                return(
                    <View style={styles.btnCont}>
                        <TouchableOpacity 
                            style={{ borderRadius: 100, width: 80, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onClose()}>
                            <View>
                                <Text style={styles.txtOKBtn}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
                break;

            case 'ERROR':
                return(
                    <View style={styles.btnCont}>
                        <TouchableOpacity 
                            style={{ borderRadius: 100, width: 140, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onClose()}>
                            <View>
                                <Text style={styles.txtOKBtn}>Forgot Password</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width:10}}>
                        </View>
                        <TouchableOpacity 
                            style={{ borderRadius: 100, width: 140, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onClose()}>
                            <View>
                                <Text style={styles.txtOKBtn}>Try Again</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
                break;
            case 'WARNING':
                return(
                    <View style={styles.btnCont}>
                        <TouchableOpacity 
                            style={{ borderRadius: 100, width: 100, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onClose()}>
                            <View>
                                <Text style={styles.txtOKBtn}>Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
                break;
        }
    }

    render(){
        return(
            <Modal 
                animationType="slide"
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => {alert("Modal has been closed.")}}>
            
                <View style={styles.container}>
                    <View style={styles.messageBox}>
                        <View style={[styles.header, this.themeColor(this.props.type)]}>
                            <View style={styles.title}>
                                <View>
                                    <Icon name={this.state._strIcon} size={30} color='#FFF'/>
                                </View>
                                <View>
                                    <Text style={styles.txtTitle}>{this.state._strTitle}</Text>
                                </View>

                            </View>
                            <View style={styles.btnCloseCont}>
                                <TouchableOpacity 
                                    style={styles.btnClose}
                                    activeOpacity={0.6}
                                    onPress={() => this.props.onClose()}>
                                    <Text style={styles.txtCloseBtn}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View> 

                        <View style={styles.msgCont}>
                            <Text>This is a message</Text>
                        </View>
                        
                        {this.renderButtons()}

                    </View>
                </View>
                
            </Modal>

        );
    }
}