/**************************************************************
 *  FileName:           index.js
 *  Description:        Error Prompt Component
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
    Modal
} from 'react-native';

import styles from './styles';

export default class ErrorPrompt extends Component{
    constructor(props){
        super(props);
        this.state = {
            _errorForm: false
        }
        alert('im here!');
    }
    
    render(){
        return(
            <View>
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
            </View>
        );
    }
}
