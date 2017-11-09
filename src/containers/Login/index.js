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
import Logo from './logo';
import ErrorPrompt from '../../components/ErrorPrompt';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            //Date Time
            _curDate: '',
            _curTime: '',
            _curDay: '',

            //Login Credentials
            _username: '',
            _password: '',

            //FormButtons
            _errorForm: false,
            _enableBtn: true,
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
            _errorForm: false,
            _successForm: false,
            _timeType: '',
            _strTime: '',
        }
    }

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

    getCurrentTime = () => {
        let _curWeekday = moment().format("dddd").toUpperCase()
        
        this.setState({
            _curDate: moment().format("LL"),
            _curTime: moment().format("LTS"),
            _curDay: this.getDayAbbrev(_curWeekday)
        });
    }

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

    transTimeIn(strType){
        this.setState({
            _timeType: strType,
            _strTime: this.state._curTime,
            _successForm: true
        });       
    }

    loginFunc(){
        fetch('http://192.168.1.6:8080/payroll/logins.php',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sysDate: this.state._curDate,
                sysTime: this.state._curTime,
                username: this.state._username,
                password: this.state._password,
            })

        }).then((response)=> response.json())
            .then((res)=>{
                    /* alert(res); */
                    <ErrorPrompt/>
                    
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
                        this.setState({_errorForm: true})
                    }
                    else {
                        alert('successFlag: ' + this.state._resSuccess + '\n' +
                            'msg: ' + this.state._resMsg + '\n' +
                            'userGroup: ' + this.state._resUserGroup + '\n' +
                            'firstName: ' + this.state._resFName + '\n' +
                            'middlename: ' + this.state._resMName + '\n' +
                            'lastname: ' + this.state._resLName + '\n' +
                            'companyName: ' + this.state._resCompany + '\n' +
                            'accessToken: ' + this.state._resAccessToken + '\n')
                    }

                        
            }).catch((error)=> {
                alert('Server is offline.');
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
                                    <Icon style={styles.iconField} size={30}name='md-person' color='#838383' />
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
                                            onPress={() => this.transTimeIn('Time-in')}>
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
                                            onPress={() => {this.doNothing}}>
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
                                        onPress={() => {this.loginFunc()}}>
                                        <Image 
                                            style={styles.imgCustomBtn} 
                                            source={require('../../assets/img/log-in-button.png')}/>
                                            <Text style={{color: this.state._btnTextColor, position: 'absolute', fontFamily: 'Helvetica-Light', fontSize: 15}}>LOG IN</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state._errorForm}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7);'}}>
                        
                        <View style={{
                        width: 450,
                        height: 200,
                        backgroundColor:'#e74c3c',
                        flexDirection: 'column',
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: '#ddd',
                        borderBottomWidth: 0,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 4,
                        elevation: 1,
                        }}>

                        <TouchableHighlight 
                            onPress={() => {
                                this.setState({_errorForm: false})
                            }}
                            style={{
                            marginLeft:400,
                            height:26,
                            backgroundColor:'#D1D4D6',
                            justifyContent: 'center',
                            alignItems: 'center'
                            }}>
                            <Text style={{flex:1,flexDirection: 'column',fontWeight:'bold',fontSize:20}}>X</Text>
                        </TouchableHighlight>

                            <View style={{
                            width:450,
                            height:190,
                            backgroundColor:'white',marginTop:0,
                            borderWidth: 1,
                            borderRadius: 4,
                            borderColor: '#ddd',
                            borderBottomWidth: 4,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 4,
                            elevation: 4,
                            alignItems: 'center'
                            }}>
                                <Text style={{fontFamily:'helvetica',fontSize:40,fontWeight:'bold',color:'#e74c3c',marginTop:10}}>Error!</Text>
                                <Text style={{fontFamily:'helvetica',fontSize:20,fontWeight:'300'}}>Your username or password is wrong.</Text>

                                <View style={{flex:1,flexDirection: 'row',marginTop:10}}>
                                <TouchableHighlight 
                                    onPress={() => {
                                        this.setState({_errorForm: false});
                                        alert('Form Should display.');
                                    }} style={{
                                    width:170,
                                    backgroundColor:'white',
                                    height:40,
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    marginRight:10,
                                    alignItems: 'center',
                                    justifyContent:'center',
                                    }}>
                                    <Text style={{fontFamily:'helvetica',fontSize:15,fontWeight:'normal'}}>FORGOT PASSWORD</Text>
                                </TouchableHighlight>

                                <TouchableHighlight 
                                    onPress={() => {
                                        this.setState({_errorForm: false})
                                    }}
                                    style={{
                                    width:170,backgroundColor:'white',
                                    height:40,
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    marginRight:10,
                                    alignItems: 'center',
                                    justifyContent:'center'
                                    }}>
                                    <Text style={{fontFamily:'helvetica',fontSize:15,fontWeight:'normal'}}>TRY AGAIN</Text>
                                </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal> 
                
                    {/*modal for time in*/}
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state._successForm}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                        >
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.7);'}}>

                    <View style={{
                        width: 450,
                        height: 200,
                        backgroundColor:'#2C5C36',
                        flexDirection: 'column',
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: '#ddd',
                        borderBottomWidth: 0,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 4,
                        elevation: 1,
                    }}>

                        <TouchableHighlight onPress={() => {
                            this.setModalTimeinVisible(!this.state._successForm)
                        }} style={{
                            marginLeft:400,
                            height:26,
                            backgroundColor:'#D1D4D6',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{flex:1,flexDirection: 'column',fontWeight:'bold',fontSize:20}}>X</Text>
                        </TouchableHighlight>

                        <View style={{
                            width:450,
                            height:190,
                            backgroundColor:'white',marginTop:0,
                            borderWidth: 1,
                            borderRadius: 4,
                            borderColor: '#ddd',
                            borderBottomWidth: 4,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 4,
                            elevation: 4,
                            alignItems: 'center'
                        }}>
                            <Text style={{fontFamily:'helvetica',fontSize:40,fontWeight:'bold',color:'#2C5C36',marginTop:10}}>Success!</Text>
                            <Text style={{fontFamily:'helvetica',fontSize:20,fontWeight:'300'}}>{this.state._resFName}, your {this.state._timeType} today is {this.state._strTime}.</Text>

                            <View style={{flex:1,flexDirection: 'row',marginTop:10}}>
                                <TouchableHighlight 
                                onPress={() => {
                                    this.setState({_successForm: false})
                                }} 
                                style={{
                                    width:170,
                                    backgroundColor:'white',
                                    height:40,
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    marginRight:10,
                                    alignItems: 'center',
                                    justifyContent:'center',
                                }}>
                                    <Text style={{fontFamily:'helvetica',fontSize:20,fontWeight:'normal'}}>OK</Text>
                                </TouchableHighlight>

                            </View>
                        </View>
                    </View>
                    </View>
                </Modal> 
                </View>
            </ScrollView>   
        );
    }
}