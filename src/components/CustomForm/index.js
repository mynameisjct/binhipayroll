/**************************************************************
 *  FileName:           index.js
 *  Description:        Custom Table Component
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2018-01-08

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

import * as oHelper from '../../helper';

export class DynamicList extends Component{
    constructor(props){
        super(props);
        this._nodes = new Map();
        this.state={
            _value: this.props.value.length == 0 ? [''] : this.props.value
        }
    }

    _addNewRow = () => {
        let aList = [...this.state._value];
        if(oHelper.isStringEmptyOrSpace(aList.slice(-1)[0])){
            this._textInput.focus();
        }
        else{
            aList.push('');
            this.setState({
                _value: aList
            })
        }
    }

    getValue = () => {
        return this.state._value;
    }

    _requestRemoveRow = (index) => {
        Alert.alert(
            'Confirm to Delete',
            'Removing a data is an irreversible action. Are you sure you want to proceed?',
            [
              {text: 'Cancel', onPress: () => {}},
              {text: 'YES', onPress: () => this._removeRow(index)},
            ],
            { cancelable: false }
          )
    }

    _removeRow = (index) => {
        let aList = [...this.state._value];
        aList.splice(index, 1);
        this.setState({
            _value: aList
        })
    }

    _updateInput = (index, value) => {
        let aList = [...this.state._value];
        aList[index] = value;
        this.setState({
            _value: aList
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.contLabel}>
                    <Text>{this.props.label || ''}</Text>
                </View>
                {
                    this.state._value.map((data,index) =>
                        <View style={styles.contInput} key={index}>
                            <TextInput 
                                ref={(input) => { this._textInput= input; }}
                                keyboardType={this.props.keyboardType || 'default'}
                                style={styles.textinputField}
                                onChangeText={inputTxt => {this._updateInput(index, inputTxt)}}
                                value={data}
                                returnKeyType='next'
                                autoCorrect={false}
                                autoCapitalize='none'
                            />
                            {
                                this.state._value.length !== 1 ?
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => {this._requestRemoveRow(index)}}
                                        style={{paddingRight: 10, position: 'absolute', top: 0, right: 0, bottom: 0, alignItems: 'flex-end', justifyContent: 'center', width: 70}}
                                        >
                                        <Icon size={25} name='close-circle' color='#EEB843' />
                                    </TouchableOpacity>
                                :
                                    null
                            }
                        </View>
                    )
                }
                
                <View style={styles.contInfoLabel}>
                    <View style={styles.contError}>
                        <Text style={styles.txtError}>
                            {/* *Sample Error */}
                        </Text>
                    </View>

                    <View style={styles.contAddLabel}>
                        <Text style={styles.txtAddLabel} onPress={() => this._addNewRow()}>
                            Add New
                        </Text>
                    </View>
                    <View style={styles.contIcon}>
                        <Icon name='plus-circle-outline' onPress={() => this._addNewRow()} size={25} color='#EEB843'/>
                    </View>
                </View>
            </View>
        );
    }
}
