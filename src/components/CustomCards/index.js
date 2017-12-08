/**************************************************************
 *  FileName:           index.js
 *  Description:        Custom Cards
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-12-01

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';

import styles from './styles';

//Available Props:
//1. title

export default class CustomCard extends Component{

    render(){
        let oTitle = null;
        if(this.props.oType.toUpperCase()=='SWITCH'){
            oTitle =  
                <View style={styles.textCont}>
                    <View style={{flex: 0.5, flexDirection: 'column'}}>
                        <View style={{flex:0.65, justifyContent: 'flex-end'}}>
                            <Text style={styles.txtTitle}>{this.props.title}</Text>
                        </View>
                        <View style={{flex: 0.35, justifyContent: 'flex-start'}}>
                            <Text style={styles.txtDescription}>{this.props.description}</Text>
                        </View>
                    </View>
                    <View style={{flex:0.5, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 50}}>
                        {this.props.oSwitch}
                    </View>
                </View>
        }
        else if(this.props.oType.toUpperCase()=='PICKER'){
            oTitle =  
                <View style={styles.textCont}>
                    <View style={{flex: 0.5, flexDirection: 'column'}}>
                        <View>
                            <Text style={styles.txtTitle}>{this.props.title}</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: 'red', flex:0.5, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 50}}>
                        {this.props.oPicker}
                    </View>
                </View>
        }
        else{
            oTitle =  
                <View style={styles.textCont}>
                    <Text style={styles.txtTitle}>{this.props.title}</Text>
                </View>
        }

        return(
            <View style={styles.container}>
                <View style={styles.titleCont}>
                    {oTitle}
                </View>
                <View style={styles.contentCont}>
                    <View style={styles.detailsCont}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        );
    }
}
