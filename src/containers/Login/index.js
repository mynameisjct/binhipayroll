/**************************************************************
 *  FileName:           index.js
 *  Description:        Login Container
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";

import styles from './styles';
import DigitalClock from '../../components/DigitalClock';
import Logo from '../../components/BinhiLogo';
import ErrorPrompt from '../../components/MessageBox/error';
import SuccessPrompt from '../../components/MessageBox/success';

let tmpUsername = "admin";
let tmpPassword = "123";
let tmpFName = "Pedro";
let tmpMName = "Protacio";
let tmpLName = "Duterte";
let tmpCompany = ["Uniliver", "Ayala", "Nestle"];
let maxAttemps = 3;

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            //Date Time for Clock
            _curDate: '',
            _curDateMDY: '',
            _curTime: '',
            _curDay: '',
            
            //Current Date Time for Transaction
            _transDate: '',
            _transTime: '',

            //Login Credentials
            _username: 'admin',
            _password: '123',

            //FormButtons
            _errorForm: false,
            _enableBtn: false,
            _btnTextColor: 'gray',
            
            //Response from DB
            _resSuccess: '',
            _resMsg: '',
            _resUserGroup: '',
            _resFName: 'TEMP-NAME',
            _resMName: '',
            _resLName: '',
            _resCompany: [],
            _resAccessToken: '',

            //forms
            _msgBoxType: '',
            _msgBoxShow: false,
            _timeType: '',
            _transTime: '',
            _iPasswordAttemp: 0,
            _prevUsername: ''
        };

        this.closeSuccessMsg = this.closeSuccessMsg.bind(this)
    }

    //Initializations
    componentWillMount()
    {
        this.getCurrentTime();
    }

    componentWillUnmount()
    {
        clearInterval(this.timer);
    }

    componentDidMount() {
        this.timer = setInterval(() => { 
            this.getCurrentTime();
        }, 1000);
    }


    closeSuccessMsg = () => {
        this.setState({
            _msgBoxShow: false
        });
    }

    //Get Current Time
    getCurrentTime = () => {
        let _curWeekday = moment().format("dddd").toUpperCase()
        this.setState({
            _curDate: moment().format("LL"),
            _curDateMDY:  moment().format("MM/DD/YYYY"),
            _curTime: moment().format("LTS"),
            _curDay: this.getDayAbbrev(_curWeekday)
        });
    }

    //Get Day Abbreviations
    getDayAbbrev = (_strDay) => {
        let _curAbbrev = _strDay=='SUNDAY' ? 'SUN':
        _strDay=='MONDAY' ? 'MON':
        _strDay=='TUESDAY'?'TUE':
        _strDay=='WEDNESDAY'?'WED':
        _strDay=='THURSDAY' ? 'THU':
        _strDay=='FRIDAY'?'FRI':
        _strDay=='SATURDAY'?'SAT':'SUN';

        return _curAbbrev;
    }
    
    //Enabling-Disbling Buttons
    setUsername(_strUsername){
        this.setState({_username: _strUsername});
        this.enableButtons(_strUsername, this.state._password);
    }

    setPassword(_strPassword){
        this.setState({_password: _strPassword});
        this.enableButtons(this.state._username, _strPassword);
    }

    enableButtons(_strUsername,_strPassword){
        let _bFlag = false;
        let _strBtnColor = '#fff';

        if(_strUsername=="" || _strPassword==""){
            _bFlag = true;
            _strBtnColor = 'gray'
        }

        this.setState({
            _enableBtn: _bFlag,
            _btnTextColor: _strBtnColor
        });
    }

    //Time-In
    transTimeLog(strType){
        this.setTransTime(
            () => {this.fetchDataFromDB();}
        );

        this.setState({
            _timeType: strType,
            _strMsg: this.state._resFName + ', ' + 
                        'your ' + strType + ' today is ' + this.state._curTime + '.',
        },
            function() {
                this.setState({_successForm: true})
            }
        );
    }



    setTransTime(callback) {
        this.setState({
            _transDate: this.state._curDateMDY,
            _transTime: this.state._curTime
        },
            () => {callback();}
        );
    }

/*     validateCredentials(){
        this.setTransTime(
            () => {this.fetchDataFromDB();}
        );
    } */

    validateCredentials(){
        this.setTransTime(
            () => {this.tmpFetchDataFromDB();}
        );
    }

    passwordErrorFlag(callback){
        if (this.state._prevUsername == this.state._username){
            this.setState(prevState => ({ _iPasswordAttemp: prevState._iPasswordAttemp + 1 }));
        }
        else {
            this.setState({_iPasswordAttemp: 0} );
        }
        callback();
    }
    
    tmpFetchDataFromDB(){
        if(this.state._username == tmpUsername){
            if(this.state._password == tmpPassword){
                this.setState({
                    _resMsg: 'Credentials are correct. This should proceed to Dash Board.',
                    _msgBoxType: 'success',
                });
            }
            else {
                this.setState({
                    _prevUsername: this.state._username
                },
                    () => {
                        this.passwordErrorFlag(                
                            () => {
                                if(this.state._iPasswordAttemp >= maxAttemps){
                                    this.setState({
                                    _resMsg: 'Your account is temporarily locked due to maximum password attemp. Contact your employer or Binhi-Medfi.',
                                    _msgBoxType: 'error-ok',
                                    });
                                }
                                else if(this.state._iPasswordAttemp == maxAttemps-1) {
                                    this.setState({
                                        _resMsg: 'You have only one (1) password attempt left. Your account will be temporarily locked when maximum attemp is reached.',
                                        _msgBoxType: 'warning',
                                        });
                                }
                                else{
                                    this.setState({
                                        _resMsg: 'The password you’ve entered is incorrect.',
                                        _msgBoxType: 'error-password',
                                    });
                                }
                            }
                        );
        
                    }
                );
            }
        }

        else{
            this.setState({
                _resMsg: 'The username you’ve entered doesn’t match any account.',
                _msgBoxType: 'error-ok',
            })
        }
        
        this.setState({
            _msgBoxShow: true
        })
    }

    fetchDataFromDB(){
/*         alert(this.state._transDate + '-------' + this.state._transTime); */
        fetch('http://192.168.1.6:8080/payroll/logins.php',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sysdate: this.state._transDate,
                systime: this.state._transTime,
                username: this.state._username,
                password: this.state._password,
            })
        }).then((response)=> response.json())
            .then((res)=>{
                    /* alert(res); */
                    this.setState({ 
                        _resSuccess: res["successflag"],
                        _resMsg: res["msg"],
                        _resUserGroup: res["usergroup"],
                        _resFName: res["firstname"],
                        _resMName: res["middlename"],
                        _resLName: res["lastname"],
                        _resCompany: res["companyname"],
                        _resAccessToken: res["accesstoken"]                           
                    });
                    if (res=="Username or Password is not correct"){
                        /* this.setState({_errorForm: true}) */
                        alert('Wrong PW')
                    }
                    else {
                        alert('successFlag: ' + this.state._resSuccess + '\n' +
                            'msg: ' + this.state._resMsg + '\n' +
                            'userGroup: ' + this.state._resUserGroup + '\n' +
                            'firstName: ' + res["firstname"] + '\n' +
                            'middlename: ' + this.state._resMName + '\n' +
                            'lastname: ' + this.state._resLName + '\n' +
                            'companyName: ' + this.state._resCompany + '\n' +
                            'accessToken: ' + this.state._resAccessToken + '\n')
                    }
            }).catch((error)=> {
                alert(error);
            });
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.mainCont}>
                        <View style={[styles.boxCont, styles.boxContTopEdge, styles.headerCont]}>
                            <DigitalClock 
                                time   ={this.state._curTime} 
                                date={this.state._curDate} 
                                day={this.state._curDay}/>
                        </View>
                        <View style={[styles.boxCont, styles.logoCont]}>
                            <Logo/>
                        </View>

                        <View style={[styles.boxCont, styles.formCont, styles.boxContBottom]}>
                            <View style={styles.boxContField}>
                                <View style={styles.flexIcon}>
                                    <Icon style={styles.iconField} size={30} name='md-person' color='#838383' />
                                </View>
                                <TextInput 
                                    placeholder='Username...'
                                    style={styles.textinputField}
                                    onChangeText={_curUsername => {
                                        this.setUsername(_curUsername);
                                        }
                                    }
                                    value={this.state._username}
                                    ref='_fieldUsername'
                                    onSubmitEditing={(event) => {this.refs._fieldPassword.focus();}}
                                    returnKeyType="next"
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                            <View style={styles.boxContField}>
                                <View style={styles.flexIcon}>
                                    <Icon style={styles.iconField} size={30}name='ios-lock' color='#838383' />
                                </View>
                                <TextInput 
                                    placeholder='Password...' 
                                    style={styles.textinputField}
                                    onChangeText={_curPassword => {
                                        this.setPassword(_curPassword);
                                        }
                                    }
                                    value={this.state._password}
                                    ref='_fieldPassword'
                                    onSubmitEditing={(event) => {this.refs._fieldPassword.focus();}}
                                    returnKeyType="done" 
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                            <View style={styles.btnCont}>
                                <View style={styles.timeCont}>
                                    <View style={[styles.btnTimeCont]}>
                                        <TouchableOpacity 
                                            disabled={this.state._enableBtn}
                                            style={styles.touchableTimeBtn}
                                            activeOpacity={0.6}
                                            onPress={() => this.transTimeLog('timein')}>
                                            <Image
                                                style={styles.imgCustomBtn} 
                                                source={require('../../assets/img/log-in-button.png')}/>
                                                <Text style={{color: this.state._btnTextColor, position: 'absolute', fontFamily: 'Helvetica-Light', fontSize: 15}}>TIME IN</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.btnGap]}>
                                    </View>
                                    <View style={[styles.btnTimeCont]}>
                                        <TouchableOpacity 
                                            disabled={this.state._enableBtn}
                                            style={styles.touchableTimeBtn}
                                            activeOpacity={0.6}
                                            onPress={() => this.transTimeLog('timeout')}>
                                            <Image
                                                style={styles.imgCustomBtn}  
                                                source={require('../../assets/img/log-in-button.png')}/>
                                                <Text style={{color: this.state._btnTextColor, position: 'absolute', fontFamily: 'Helvetica-Light', fontSize: 15}}>TIME OUT</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={[styles.boxContLogin, styles.loginCont]}>
                                    <TouchableOpacity 
                                        disabled={this.state._enableBtn}
                                        style={styles.touchableLoginBtn}
                                        activeOpacity={0.6}
                                        onPress={() => {this.validateCredentials()}}>
                                        <Image 
                                            style={styles.imgCustomBtn} 
                                            source={require('../../assets/img/log-in-button.png')}/>
                                            <Text style={{color: this.state._btnTextColor, position: 'absolute', fontFamily: 'Helvetica-Light', fontSize: 15}}>LOG IN</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <SuccessPrompt
                    promptType={this.state._msgBoxType}
                    show={this.state._msgBoxShow}
                    onClose={this.closeSuccessMsg}
                    message={this.state._resMsg}
                    navigate={'test'}
                />
            </ScrollView>   
        );
    }
}