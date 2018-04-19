import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    Switch
} from 'react-native';
import CustomCard from '../../../components/CustomCards';
import GenericContainer from '../../../components/GenericContainer';

//Component Constants
const TITLE = 'Employee Savings Policy';
const DESCRIPTION = 'Automatically Deduct Savings on every Pay Day'
const SWITCH_COLOR_ON = '#838383';
const SWITCH_COLOR_THUMB = '#EEB843';
const SWITCH_COLOR_TINT = '#505251';

export default class EmployeeSavingsPolicy extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                isenabled: false
            },

            loadingScreen: {
                show: false,
                msg: 'test'
            },

            msgBox: {
                show: false,
                type: '',
                msg: ''
            },
            
        }
    }
    _onRefresh = () => {
        
    }

    _toggleSwitch = (value) => {

    }

    _msgBoxOnClose = () => {
        let oMsgBox = {...this.state.msgBox};
        oMsgBox.show = false;
        oMsgBox.type = '';
        oMsgBox.msg = '';
        
        this.setState({
            msgBox: oMsgBox
        });
    }

    _onPress = () => {
        let oLoadingScreen = {...this.state.loadingScreen};
        oLoadingScreen.show = true;
        oLoadingScreen.msg = 'HAHAHHAhAHA';;
        
        this.setState({
            loadingScreen: oLoadingScreen
        });
    }

    render(){/*  */
        return(
            <GenericContainer
                msgBoxShow = {this.state.msgBox.show}
                msgBoxType = {this.state.msgBox.type}
                msgBoxMsg = {this.state.msgBox.msg}
                msgBoxOnClose = {this._msgBoxOnClose}
                msgBoxOnContinue = {this._msgBoxOnClose}
                loadingScreenShow = {this.state.loadingScreen.show}
                loadingScreenMsg = {this.state.loadingScreen.msg}
                status={[1, 'Success!']}
                title={'TEST'}
                onRefresh={this._onRefresh}>

                <CustomCard 
                    title={TITLE} 
                    oType='switch'
                    description = { DESCRIPTION } 
                    rightHeader = {
                        <Switch
                            onValueChange={ (value) => {this._toggleSwitch(value)}} 
                            onTintColor={SWITCH_COLOR_ON}
                            thumbTintColor={SWITCH_COLOR_THUMB}
                            tintColor={SWITCH_COLOR_TINT}
                            value={this.state.data.isenabled}
                        />
                    }
                >
                </CustomCard>
            </GenericContainer>
        );
    }
    
}