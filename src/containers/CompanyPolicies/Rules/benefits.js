import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    Picker,
    DatePickerAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'

//Custom Components
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import CustomCard, 
{
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';

const title_Gov = 'Government Benefits';
const description_Gov= 'Allow SSS, PAGIBIG, and PhilHealth';
const title_Comp = 'Company Benefits';
const description_Comp= 'Add Company Allowances';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';


export default class Overtime extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: ['2', 'Loading...'],
            _taxData: {},
            _changeFlag: false,

            //MessageBox
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',

            //Refresh
            _refreshing: false,

            _tempSwitch: true,
        }
    }
    _setSwitch = (value) =>{
        this.setState({
            _tempSwitch: value
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <CustomCard 
                    title={title_Gov} 
                    description={description_Gov} 
                    oType='Switch'
                    rightHeader={
                        <Switch
                            onValueChange={ (value) => this._setSwitch(value)} 
                            onTintColor={color_SwitchOn}
                            thumbTintColor={color_SwitchThumb}
                            tintColor={color_SwitchOff}
                            value={ this.state._tempSwitch } 
                        />
                    }
                >
                </CustomCard>
                <CustomCard 
                    title={title_Comp} 
                    description={description_Comp} 
                    oType='Switch'
                    rightHeader={
                        <Switch
                            onValueChange={ (value) => this._setSwitch(value)} 
                            onTintColor={color_SwitchOn}
                            thumbTintColor={color_SwitchThumb}
                            tintColor={color_SwitchOff}
                            value={ this.state._tempSwitch } 
                        />
                    }
                >
                </CustomCard>
                
            </View>
        );
    }
}