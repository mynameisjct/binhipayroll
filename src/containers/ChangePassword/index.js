import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import Header1 from '../Headers/header1';
import styles from './styles'

import MsgBox from '../../components/MessageBox/';

let minPasswordLength = 6;

export default class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            _curPassword: '',
            _newPassword: '',
            _confirmPassword: '',
            _msgBoxMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
        }
        this.onBackPress = this.onBackPress.bind(this);
    }

    static navigationOptions = {
        headerTitle : 
            <Header1 
                navigate='Login'
                title= 'Change Your Current Password'
                onBtnPress={this.onBackPress}
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    onBackPress(strType){
        this.props.navigation.navigate('EmprDashBoard');
    }

    checkAndCommit = () =>{
        let {params} = this.props.navigation.state;
        if (this.state._newPassword !== this.state._confirmPassword){
            this.setState({
                _msgBoxMsg: 'New password mismatch. Please confirm.',
                _msgBoxType: 'error-ok'
            },
                () => {
                    this.setState({
                        _msgBoxShow: true
                    });
                }
            )
        }
        else if(this.state._newPassword == params.password){
            this.setState({
                _msgBoxMsg: 'New password is invalid. It must not be the same with the default password. Please type new password.',
                _msgBoxType: 'error-ok'
            },
                () => {
                    this.setState({
                        _msgBoxShow: true
                    });
                }
            )
        }
        else if(this.state._newPassword.length < minPasswordLength){
            this.setState({
                _msgBoxMsg: 'Password must be atleast 6 characters.',
                _msgBoxType: 'error-ok'
            },
                () => {
                    this.setState({
                        _msgBoxShow: true
                    });
                }
            )
        }

        else {
            this.setState({
                _msgBoxMsg: 'Your Password is successfully updadated. Login your account to confirm changes.',
                _msgBoxType: 'success'
            },
                () => {
                    this.setState({
                        _msgBoxShow: true
                    });
                }
            )
            this.props.navigation.navigate('Login');
        }
    }

    closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        });
    }
    render(){

        return(
            <ScrollView style={styles.container}>
                <View style={styles.logoCont}>
                </View> 

                <View style={{alignContent: 'center', justifyContent: 'center', flex: 3, backgroundColor: 'transparent'}}>
                    <View style={styles.formCont}>
                        {/* <View style={styles.oldCont}>
                            <Text style={styles.txtLabel}>'Current Password'} </Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={_curPW => {
                                    this.setState({_curPassword: _curPW});
                                    }
                                }
                                value={this.state._curPassword}
                                returnKeyType="done"
                                underlineColorAndroid='transparent'
                                secureTextEntry={true}
                            />
                        </View> */}
                        <View style={styles.newCont}>
                            <Text style={styles.txtLabel}>New Password</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={_curNewPW => {
                                    this.setState({_newPassword: _curNewPW});
                                    }
                                }
                                value={this.state._newPassword}
                                underlineColorAndroid='transparent'
                                returnKeyType="done"
                                secureTextEntry={true}
                            />
                        </View>

                        <View style={styles.confirmCont}>
                            <Text style={styles.txtLabel}>Confirm Password</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={_curConfirmPW => {
                                    this.setState({_confirmPassword: _curConfirmPW});
                                    }
                                }
                                value={this.state._confirmPassword}
                                returnKeyType="done"
                                underlineColorAndroid='transparent'
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.btnCont}>
                    <TouchableOpacity 
                        style={{ borderRadius: 100, width: 190, height: 50, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent:'center', alignItems: 'center'}}
                        activeOpacity={0.6}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <View>
                            <Text style={styles.txtOKBtn}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{width:15}}>
                    </View>
                    <TouchableOpacity 
                        style={{ borderRadius: 100, width: 190, height: 50, backgroundColor: '#EEB843', justifyContent:'center', alignItems: 'center'}}
                        activeOpacity={0.6}
                        onPress={() => this.checkAndCommit()}>
                        <View>
                            <Text style={styles.txtOKBtn}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <MsgBox 
                    promptType={this.state._msgBoxType}
                    show={this.state._msgBoxShow}
                    onClose={this.closeMsgBox}
                    message={this.state._msgBoxMsg}
                />

            </ScrollView>
        );
    }
}