import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Switch
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'
import CustomCard from '../../../components/CustomCards';

const title_BreakTime = 'Break Time';
const description_BreakTime = 'Allow break time';
const color_SwitchOn='#EEB843';
const color_SwitchOff='#838383';
const color_SwitchThumb='#505251';

export default class Breaktime extends Component{
    constructor(props){
        super(props);
        this.state = {
            _isBreaktimeEnabled: false
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <CustomCard 
                        title={title_BreakTime} 
                        description={description_BreakTime} 
                        oType='Switch'
                        oSwitch={
                            <Switch 
                                onValueChange={ (value) => this.setState({_isBreaktimeEnabled: value})} 
                                onTintColor={color_SwitchOn}
                                thumbTintColor={color_SwitchThumb}
                                tintColor={color_SwitchOff}
                                value={ this.state._isBreaktimeEnabled } 
                            /> 
                        }
                    >
                    {
                        
                    }
                        
                                
                    </CustomCard>
                </ScrollView>
            </View>
        );
    }
}