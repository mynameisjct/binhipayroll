/**************************************************************
 *  FileName:           index.js
 *  Description:        Custom Table Component
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2018-01-08

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';

import styles from './styles';

export default class CustomTable extends Component{
    render(){
        return(
            <View>
                <Text style={styles.textDate}>{this.props.date.toUpperCase() + '  ' + this.props.day}</Text>
                <Text style={styles.textTime}>{this.props.time}</Text>
            </View>
        );
    }
}

export class GenericTable extends PureComponent{
    render(){
        return(
            <View>
                
            </View>
        )
    }
}
/* 
export class GenericTable extends PureComponent{
    render(){
        return(
            <View style={styles.conta}>
                <ScrollView horizontal={true}>
                    <View style={styles.leaveCont}>
                        <View style={[styles.breakTimeDetailsCont, styles.breakHeaderBorder]}>
                            <View style={styles.leaveNameCont}>
                                <Text style={styles.txtBreakName}>NAME</Text>
                            </View>
                            <View style={styles.leaveDetailsCont}>
                                <Text style={styles.txtDefault}>NUMBER OF PAID DAYS</Text>
                            </View>
                            { 
                                !this.props.disabledMode ?
                                    <View style={styles.leaveDetailsCont}>
                                        <Text style={styles.txtDefault}>DELETE</Text>
                                    </View>
                                :null
                            }
                                
                        </View>
                        
                        {
                            this.props.data.data.map((oLeave, index) => (
                                <TouchableNativeFeedback
                                    key={index}
                                    onPress={() => {
                                        this._requestToShowForm(oLeave)
                                    }}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View style={styles.breakTimeDetailsCont}>
                                        <View style={styles.leaveNameCont}>
                                            <Text style={styles.txtBreakName}>{oLeave.name}</Text>
                                        </View>
                                        <View style={styles.leaveDetailsCont}>
                                            <Text style={styles.txtDefault}>{oLeave.paiddays}</Text>
                                        </View>
                                        { 
                                            !this.props.disabledMode ?
                                                <View style={styles.leaveDetailsCont}>
                                                    <TouchableOpacity
                                                        activeOpacity={0.7}
                                                        onPress={() => {this.props.deleteItem(oLeave)}}
                                                        >
                                                        <Icon size={30} name='md-close-circle' color='#EEB843' />
                                                    </TouchableOpacity>
                                                </View>
                                            : null
                                        }
                                    </View>
                                </TouchableNativeFeedback>
                            ))
                        }
                        { 
                            !this.props.disabledMode ?
                                <View style={styles.breakTimeDetailsCont}>
                                    <View style={styles.breakNameCont}>
                                        <TouchableOpacity
                                            style={{paddingLeft: 30, paddingTop: 10}}
                                            activeOpacity={0.7}
                                            onPress={() => {this._requestToShowForm(null)}}
                                            >
                                            <Icon size={30} name='md-add' color='#EEB843' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            :
                            null
                        }

                    </View>
                </ScrollView>
            </View>
        )
    }
} */