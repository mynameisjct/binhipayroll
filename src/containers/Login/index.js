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

import styles from './styles';
import Clock from './header';
import Logo from './logo';
import Form from './form';

import moment from "moment";

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            _curDate: '',
            _curTime: '',
            _curDay: '',
            _username: '',
            _password: '',
            _errorForm: false
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
        if (_username || _password){
            this.setState({
                _errorForm: true,
            });
        }
    }

    render(){
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.mainCont}>
                    <View style={[styles.boxCont, styles.boxContTopEdge, styles.headerCont]}>
                        <Clock 
                            time={this.state._curTime} 
                            date={this.state._curDate} 
                            day={this.state._curDay}/>
                    </View>
                    <View style={[styles.boxCont, styles.logoCont]}>
                        <Logo/>
                    </View>

                    <View style={[styles.boxCont, styles.formCont, styles.boxContBottom]}>
                        <Form/>
                    </View>
                </View>

                {/*modal for error message*/}
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

                        <TouchableHighlight onPress={() => {
                            this.set_errorFormVisible(!this.state._errorForm)
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
                                <Text style={{fontFamily:'helvetica',fontSize:40,fontWeight:'bold',color:'#e74c3c',marginTop:10}}>Error!</Text>
                                <Text style={{fontFamily:'helvetica',fontSize:20,fontWeight:'300'}}>Your username or password is wrong.</Text>

                                <View style={{flex:1,flexDirection: 'row',marginTop:10}}>
                                <TouchableHighlight onPress={() => {
                                    this.set_errorFormVisible(!this.state._errorForm)
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

                                <TouchableHighlight onPress={() => {
                                    this.set_errorFormVisible(!this.state._errorForm)
                                    }} style={{
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
            </View>
            </ScrollView>   
        );
    }
}