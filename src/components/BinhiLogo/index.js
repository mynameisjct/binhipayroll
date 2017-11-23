/**************************************************************
 *  FileName:           logo.js
 *  Description:        Login Logo
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
    Image
} from 'react-native';

import styles from './styles';

const iLogoMinSize = 100;
const iLogoMaxSize = 120;

export default class Logo extends Component{
    render(){
        return(
            <View>
                <Image 
                    style={styles.imgLogo}
                    resizeMode='cover'
                    source={require('../../assets/img/binhilogo.png')}
                />
                <Text style={styles.textLogoLabel}>PAYROLL SYSTEM</Text>
            </View>
        );
    }
}

export class AnimatedLogo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            _logoSize: 100,
            _incrementFlag: true
        };
    
        // Toggle the state every second
        setInterval(() => {
            let curSize = this.state._logoSize;
            let flag = this.state._incrementFlag;

            if(curSize == iLogoMaxSize){
                flag = false;
            }

            else if(curSize==iLogoMinSize){
                flag = true;
            }

            if (flag) {
                curSize+=0.5 ;
            }
            else {
                curSize-=0.5;
            }
            this.setState({
                _logoSize: curSize,
                _incrementFlag: flag
            })
        }, 20);
    }

    _setLogoSize = () => {
        console.log('this.state._logoSize: ' + this.state._logoSize);
        return(
            {
                width: this.state._logoSize
            }
        )
    }

    render(){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    style={this._setLogoSize()}
                    resizeMode='contain'
                    source={require('../../assets/img/binhilogo.png')}
                />
            </View>
        );
    }
}
