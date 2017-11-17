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

let script_IP='http://192.168.1.10:8080/payroll/';
let script_ForgotPassword='changepassword.php';

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
            _minPasswordLen: '4',
            _resSuccess: '',
        }
        this.onBackPress = this.onBackPress.bind(this);
    }

    static navigationOptions = {
        headerTitle : 
            <Header1 
                navigate='Login'
                title= 'CHANGE YOUR PASSWORD'
                onBtnPress={this.onBackPress}
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    onBackPress(strType){
        this.props.navigation.navigate('EmprDashBoard');
    }

/*     checkAndCommit = () =>{
        let {params} = this.props.navigation.state;
        if (this.state._newPassword !== this.state._confirmPassword){
            this.setState({
                _msgBoxMsg: 'Your password does not match match. Please try again.',
                _msgBoxType: 'error-ok'
            },
                () => {
                    this.setState({
                        _msgBoxShow: true
                    });
                }
            )
        }
        else if(this.state._newPassword.length < this.state._minPasswordLen){
            this.setState({
                _msgBoxMsg: 'Password must be at least 4 characters.',
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
        else {
            this.setState({
                _msgBoxMsg: 'Your Password is successfully updated. Login your account to confirm changes.',
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
    } */

    checkAndCommit = () =>{
        let {params} = this.props.navigation.state;
        if (this.state._newPassword !== this.state._confirmPassword){
            this.setState({
                _msgBoxMsg: 'Your password does not match match. Please try again.',
                _msgBoxType: 'error-ok'
            },
                () => {
                    this.setState({
                        _msgBoxShow: true
                    });
                }
            )
        }
        else if(this.state._newPassword.length < this.state._minPasswordLen){
            this.setState({
                _msgBoxMsg: 'Password must be at least 4 characters.',
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
                _msgBoxMsg: 'New password is invalid. It must not be the same with your current password.',
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
           this.pushNewPassword();
        }
    }

    responseNewPassword = () => {
        if(this.state._resSuccess==1){
            this.setState({
                _msgBoxType: 'success',
                _msgBoxShow: true
            });
        }
        else{
            this.setState({
                _msgBoxType: 'error-tryagain',
                _msgBoxShow: true
            });
        }
        this.props.navigation.navigate('Login');

    }

    pushNewPassword = () => {
        let {params} = this.props.navigation.state;

        fetch(script_IP + script_ForgotPassword,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            sysdate: '',
            systime: '',
            username: params.username,
            newpassword: this.state._newPassword
        })
        
        
        }).then((response)=> response.json())
            .then((res)=>{
                    /* alert(res); */
                    this.setState({
                        _resSuccess: res["flagno"],
                        _msgBoxMsg: res["message"],                     
                    },
                        () => {
                            console.log('*************************************')
                            console.log('SCRIPT: ' + script_IP + script_ForgotPassword)
                            console.log('INPUTS: ')
                            console.log('username: ' + params.username)
                            console.log('newpassword: ' + this.state._newPassword)
                            console.log('-----------------------------------------')
                            console.log('OUTPUTS: ')
                            console.log('_resSuccess: ' + this.state._resSuccess)
                            console.log('_resMsg: ' + this.state._msgBoxMsg)
                            this.responseNewPassword();
                        }
                    );
            }).catch((error)=> {
                alert(error);
        });
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
                    <Text style={styles.txtTitleDesc}>You may now create your new password</Text>
                </View> 

                <View style={styles.formCont}>
                    <View style={styles.fieldsCont}>
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
                            <Text style={styles.txtLabel}>NEW PASSWORD</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={_curNewPW => {
                                    this.setState({_newPassword: _curNewPW});
                                    }
                                }
                                value={this.state._newPassword}
                                underlineColorAndroid='#D1D4D6'
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
                                underlineColorAndroid='#D1D4D6'
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.btnCont}>
                    <TouchableOpacity 
                        style={styles.btnSave}
                        activeOpacity={0.6}
                        onPress={() => this.checkAndCommit()}>
                        <View>
                            <Text style={styles.txtBtnSave}>Save</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{width:15}}>
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.btnCancel}
                        activeOpacity={0.6}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <View>
                            <Text style={styles.txtBtnCancel}>Cancel</Text>
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