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
    KeyboardAvoidingView,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Clock from './header';
import Logo from './logo';
import moment from "moment";

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            _curDate: '',
            _curTime: '',
            _curDay: '',
            _username: '',
            _password: ''
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

    doNothing = () => {

    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.mainCont}>
                    <View style={[styles.boxCont, styles.boxContHeader, styles.headerCont]}>
                        <Clock 
                            time={this.state._curTime} 
                            date={this.state._curDate} 
                            day={this.state._curDay}/>
                    </View>
                    <View style={[styles.boxCont, styles.logoCont]}>
                        <Logo/>
                    </View>

                    <View style={[styles.boxCont, styles.formCont]}>
                        <View style={styles.boxContField}>
                            <View style={styles.flexIcon}>
                                <Icon style={{alignSelf: 'center'}} size={30}name='md-person' color='#838383' />
                            </View>
                            <TextInput 
                                placeholder='Username...' 
                                style={styles.textinputField}
                                onChangeText={_curUsername => this.setState({_username: _curUsername})}
                                ref='_fieldUsername'
                                onSubmitEditing={(event) => {this.refs._fieldPassword.focus();}}
                                returnKeyType="next" 
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <View style={styles.boxContField}>
                            <View style={styles.flexIcon}>
                                <Icon style={{alignSelf: 'center'}} size={30}name='ios-lock' color='#838383' />
                            </View>
                            <TextInput 
                                placeholder='Password...' 
                                style={styles.textinputField}
                                onChangeText={_curUsername => this.setState({_username: _curUsername})}
                                ref='_fieldUsername'
                                onSubmitEditing={(event) => {this.refs._fieldPassword.focus();}}
                                returnKeyType="next" 
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <View style={[styles.boxCont, styles.btnCont]}>
                            <View style={styles.timeCont}>
                                <View style={[styles.btnTimeCont]}>
                                    <TouchableOpacity 
                                        light 
                                        onPress={() => {this.doNothing}}>
                                        <Image
                                            style={{height: 45}} 
                                            source={require('../../assets/img/log-in-button.png')}/>
{/*                                         <View>
                                            <Text>TIME IN</Text>
                                        </View> */}
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.btnGap]}>
                                </View>
                                <View style={[styles.btnTimeCont]}>
                                    <TouchableOpacity 
                                        light 
                                        onPress={() => {this.doNothing}}>
                                        <Image
                                            style={{height: 45, alignItems: 'center', justifyContent:'center'}} 
                                            source={require('../../assets/img/log-in-button.png')}/>
                                        <Text style={{color: 'red', margin: 24,}}>TIME OUT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[styles.boxContLogin, styles.loginCont]}>
                                <TouchableOpacity 
                                    style={{width: 330,
                                        justifyContent:'center',
                                        alignItems:'center',backgroundColor:'#434646',
                                    }}
                                    light 
                                    onPress={() => {this.doNothing}}>
                                    <Image 
                                        style={{height: 45}} 
                                        source={require('../../assets/img/log-in-button.png')}/>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.bottomGap, styles.boxContBottom]}>
                    </View>
                </View>

            </View>
        );
    }
}