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
        <KeyboardAvoidingView behavior='position'>
            <View style={styles.container}>
                <View style={styles.flexCont}>
                    <Clock 
                        time={this.state._curTime} 
                        date={this.state._curDate} 
                        day={this.state._curDay}/>
                    <Logo/>

                    <View style={styles.flexFormUsername}> 
                        <View style={styles.flexIcon}>
                            <Icon style={{alignSelf: 'center'}} size={20}name='md-person' color='#838383' />
                        </View>
                        <View style={styles.flexFieldUsername}>
                            <TextInput 
                                placeholder='Username ...' 
                                style={styles.textinputField}
                                onChangeText={_curUsername => this.setState({_username: _curUsername})}
                                ref='_fieldUsername'
                                onSubmitEditing={(event) => {this.refs._fieldPassword.focus();}}
                                returnKeyType="next" 
                                underlineColorAndroid='transparent'
                            />
                        </View>
                    </View>

                    <View style={styles.flexFormPassword}>
                        <View style={styles.flexIcon}>
                            <Icon size={20}name='md-person' color='#838383' />
                        </View>
                        <View style={styles.flexFieldPassword}>
                            <TextInput 
                                placeholder='Password ...' 
                                style={styles.textinputField}
                                onChangeText={_password => this.setState({_password: _password})}
                                ref='_fieldPassword'
                                //onSubmitEditing={(event) => {this._TxtUsername._root.focus();}}
                                returnKeyType="done"
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                    </View>

                    <View style={styles.flexButtonTime}> 
                        <TouchableOpacity light style={{marginRight:13,width:154,
                            justifyContent:'center',
                            alignItems:'center',backgroundColor:'#434646',
                        }} onPress={() => {this.doNothing}}>

                        <Image source={require('../../assets/img/log-in-button.png')}/>
                            <View style={{position: 'absolute',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{ fontFamily:'helvetica light',
                                fontSize:18,
                                fontWeight:'300',color:'white'}}>TIME IN</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity light style={{width:154,justifyContent:'center',alignItems:'center',
                            alignItems:'center',backgroundColor:'#434646',marginRight:18}}
                            onPress={() => {this.doNothing}}>
                            <Image source={require('../../assets/img/log-in-button.png')}/>
                            <View style={{position: 'absolute',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{ fontFamily:'helvetica light',
                                fontSize:18,
                                fontWeight:'300',color:'white'}}>TIME OUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.flexButton}> 
                        <Text> Buttons Here </Text>
                    </View>
                </View>
 {/*                <Text>This will display Login</Text>
                <Button
                  onPress={() => this.props.navigation.navigate('EmpeDTR')}
                  title='Proceed to DTR'
                /> */}
            </View>
            </KeyboardAvoidingView>
        );
    }
}