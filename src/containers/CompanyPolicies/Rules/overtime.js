import React, { Component } from 'react';
import {
    View,
    Text,
    Switch
} from 'react-native';

import CustomCard from '../../../components/CustomCards';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'


const title_Overtime = 'Overtime';
const description_Overtime = 'Allow paid overtime';
const color_SwitchOn='#FFF4DE';
const color_SwitchOff='#838383';
const color_SwitchThumb='#EEB843';

export default class WorkShift extends Component {
    constructor(props){
        super(props);
        this.state = {
            _isBreaktimeEnabled: false,
        }
    }
    render(){
        const overtimeDetails = 
            <View>
                <View style={styles.childPropGroupCont}>
                    <View style={styles.childGroupTitleCont}>
                        <Text style={styles.txtChildGroupTitle}>
                            Threshhold
                        </Text>
                    </View>
                    <View style={styles.childContentCont}>
                        <View style={styles.childPropCont}>
                            <View style={styles.childPropNameCont}>
                                <Text style={styles.txtChildStyle}>
                                Minimum Paid Overtime
                                </Text>
                            </View>
                            <View style={styles.childPropValueCont}>
                                <View style={styles.datePickerCont}>
                                    <Text numberOfLines={1} style={styles.txtChildStyle}>
                                        1 Hour
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.childPropCont}>
                            <View style={styles.childPropNameCont}>
                                <Text style={styles.txtChildStyle}>
                                Maximum Paid Overtime
                                </Text>
                            </View>
                            <View style={styles.childPropValueCont}>
                                <View style={styles.datePickerCont}>
                                    <Text numberOfLines={1} style={styles.txtChildStyle}>
                                        1 Hour
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.childPropGroupCont}>
                    <View style={styles.childGroupTitleCont}>
                        <Text style={styles.txtChildGroupTitle}>
                            Rates
                        </Text>
                    </View>
                    <View style={styles.childContentCont}>
                        <View style={styles.childPropCont}>
                            <View style={styles.childPropNameCont}>
                                <Text style={styles.txtChildStyle}>
                                Regular Working Day
                                </Text>
                            </View>
                            <View style={styles.childPropValueCont}>
                                <View style={styles.datePickerCont}>
                                    <Text numberOfLines={1} style={styles.txtChildStyle}>
                                        1 x per hour
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.childPropCont}>
                            <View style={styles.childPropNameCont}>
                                <Text style={styles.txtChildStyle}>
                                Regular Holiday
                                </Text>
                            </View>
                            <View style={styles.childPropValueCont}>
                                <View style={styles.datePickerCont}>
                                    <Text numberOfLines={1} style={styles.txtChildStyle}>
                                    2 x per hour
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.childPropCont}>
                            <View style={styles.childPropNameCont}>
                                <Text style={styles.txtChildStyle}>
                                Special Holiday
                                </Text>
                            </View>
                            <View style={styles.childPropValueCont}>
                                <View style={styles.datePickerCont}>
                                    <Text numberOfLines={1} style={styles.txtChildStyle}>
                                        1.3 x per Hour
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        return(
            <View style={styles.container}>
                <CustomCard 
                    title={title_Overtime} 
                    description={description_Overtime} 
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
                        this.state._isBreaktimeEnabled ? overtimeDetails : null
                    }      
                </CustomCard>
            </View>
        );
    }
}
