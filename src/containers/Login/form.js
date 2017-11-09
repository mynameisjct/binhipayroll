/**************************************************************
 *  FileName:           form.js
 *  Description:        Form Component
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
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export default class Form extends Component{
    render(){
        return(
            <View>
                <View style={styles.boxContField}>
                    <View style={styles.flexIcon}>
                        <Icon style={styles.iconField} size={25}name='md-person' color='#838383' />
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
                        <Icon style={styles.iconField} size={25}name='ios-lock' color='#838383' />
                    </View>
                    <TextInput 
                        placeholder='Password...' 
                        style={styles.textinputField}
                        onChangeText={_curUsername => this.setState({_username: _curUsername})}
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
                                style={styles.touchableTimeBtn}
                                activeOpacity={0.6}
                                onPress={() => {this.doNothing}}>
                                <Image
                                    style={styles.imgCustomBtn} 
                                    source={require('../../assets/img/log-in-button.png')}/>
                                    <Text style={{color: '#FFF', position: 'absolute', fontFamily: 'Helvetica-Light', fontSize: 15}}>TIME IN</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.btnGap]}>
                        </View>
                        <View style={[styles.btnTimeCont]}>
                            <TouchableOpacity 
                                style={styles.touchableTimeBtn}
                                activeOpacity={0.6}
                                onPress={() => {this.doNothing}}>
                                <Image
                                    style={styles.imgCustomBtn}  
                                    source={require('../../assets/img/log-in-button.png')}/>
                                    <Text style={{color: '#FFF', position: 'absolute', fontFamily: 'Helvetica-Light', fontSize: 15}}>TIME OUT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.boxContLogin, styles.loginCont]}>
                        <TouchableOpacity 
                            style={styles.touchableLoginBtn}
                            activeOpacity={0.6}
                            onPress={() => {this.doNothing}}>
                            <Image 
                                style={styles.imgCustomBtn} 
                                source={require('../../assets/img/log-in-button.png')}/>
                                <Text style={{color: '#FFF', position: 'absolute', fontFamily: 'Helvetica-Light', fontSize: 15}}>LOG IN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
