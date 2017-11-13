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

export default class MsgBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            _errorType: '',
            _strTitle: '',
            _strHeaderColor: '',
            _strIcon: '',
            _msgBoxShow: '',
        }
    }

    componentWillMount()
    {
        this.setState({
            _errorType: this.props.promptType,
            _msgBoxShow: this.props.show
        });

        this.initFormProps();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state._msgBoxShow !== nextProps.show || 
                    this.state._errorType !== nextProps.promptType)

    }

    componentWillUpdate()
    {
        this.setState({
            _errorType: this.props.promptType,
            _msgBoxShow: this.props.show
        });

        this.initFormProps();
    }

    initFormProps(){
        let curType = this.props.promptType.toUpperCase();
        switch (curType){
            case 'SUCCESS':
                this.setState({
                    _strHeaderColor: '#2C5C36',
                    _strTitle: 'Success',
                    _strIcon: 'md-checkmark'
                });
                break;

            case 'ERROR-OK':
                this.setState({
                    _strHeaderColor: '#D75450',
                    _strTitle: 'Error',
                    _strIcon: 'ios-close-circle-outline'
                });
                break;
                
            case 'ERROR-PASSWORD':
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
            case 'WARNING-PASSWORD':
                this.setState({
                    _strHeaderColor: '#E68A00',
                    _strTitle: 'Warning',
                    _strIcon: 'ios-warning-outline'
                });
                break;
            case 'YES-NO':
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
                    _strIcon: 'ios-warning-outline'
                });
        }
    }
    themeColor = (promptType) => {
        return {
            backgroundColor: this.state._strHeaderColor
        }
    }

    renderButtons(){
        switch (this.props.promptType.toUpperCase()){
            case 'SUCCESS':
                return(
                    <View style={styles.btnCont}>
                        <TouchableOpacity 
                            style={{ borderRadius: 100, width: 140, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onClose()}>
                            <View>
                                <Text style={styles.txtOKBtn}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
                break;

            case 'ERROR-OK':
                return(
                    <View style={styles.btnCont}>
                        <TouchableOpacity 
                            style={{ borderRadius: 100, width: 140, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onClose()}>
                            <View>
                                <Text style={styles.txtOKBtn}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
                break;
                
            case 'ERROR-PASSWORD':
                return(
                    <View style={styles.btnCont}>
                        <TouchableOpacity 
                            style={{ borderRadius: 100, width: 140, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onForgotPassword()}>
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
                            style={{ borderRadius: 100, width: 140, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onWarningContinue()}>
                            <View>
                                <Text style={styles.txtOKBtn}>Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
                break;
            case 'WARNING-PASSWORD':
                return(
                    <View style={styles.btnCont}>
                        <TouchableOpacity 
                            style={{ borderRadius: 100, width: 140, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onForgotPassword()}>
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
                                <Text style={styles.txtOKBtn}>Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
                break;
            
            case 'YES-NO':
                return(
                    <View style={styles.btnCont}>
                        <TouchableOpacity 
                            style={{ borderRadius: 100, width: 140, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onClose()}>
                            <View>
                                <Text style={styles.txtOKBtn}>NO</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width:10}}>
                        </View>
                        <TouchableOpacity 
                            style={{ borderRadius: 100, width: 140, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                            activeOpacity={0.6}
                            onPress={() => this.props.onYes()}>
                            <View>
                                <Text style={styles.txtOKBtn}>YES</Text>
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
                animationType="fade"
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => {alert("Modal has been closed.")}}>
            
                <View style={styles.container}>
                    <View style={styles.messageBox}>
                        <View style={[styles.header, this.themeColor(this.state.promptType)]}>
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
                            <Text>{this.props.message} </Text>
                        </View>
                        
                        {this.renderButtons()}

                    </View>
                </View>
                
            </Modal>

        );
    }
}