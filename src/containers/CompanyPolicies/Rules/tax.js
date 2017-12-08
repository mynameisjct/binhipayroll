import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Switch,
    TouchableNativeFeedback,
    TouchableOpacity,
    Picker
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles'
import CustomCard from '../../../components/CustomCards';
import FormBreakTime from '../Forms/formBreakTime';
import MessageBox from '../../../components/MessageBox';

const title_Tax = 'Withholding Tax';
const description_Tax = 'Enable Withholding Tax Calculation';
const color_SwitchOn='#FFF4DE';
const color_SwitchOff='#838383';
const color_SwitchThumb='#EEB843';

export default class Tax extends Component{
    constructor(props){
        super(props);
        this.state = {
            _isRuleEnabled: true,
            _options: ["-- Select Period --", "Monthly", "Every Pay Day"],
            _activeValue: '',
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <CustomCard 
                        title={title_Tax} 
                        description={description_Tax} 
                        oType='Switch'
                        oSwitch={
                            <Switch
                                onValueChange={ (value) => this.setState({_isRuleEnabled: value})} 
                                onTintColor={color_SwitchOn}
                                thumbTintColor={color_SwitchThumb}
                                tintColor={color_SwitchOff}
                                value={ this.state._isRuleEnabled } 
                            />
                        }
                    >

                    {
                        this.state._isRuleEnabled ? 
                            <View style={{flexDirection: 'column'}}>
                                <View style={{height: 20}}>
                                </View>
                                <View style={styles.payrollChildProp}>
                                    <View style={[styles.titleCont, {minWidth: 180}]}>
                                        <Text style={styles.txtDefault}>Deduction Frequency </Text>
                                    </View>
                                    <View style={styles.propCont}>
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state._activeValue}
                                            onValueChange={(itemValue, itemIndex) => {this.setState({_activeValue: itemValue})}}>
                                            {
                                                this.state._options.map((taxType, index) => (
                                                    <Picker.Item key={index} label={taxType} value={taxType} />
                                                ))
                                            }
                                        </Picker>
                                    </View>
                                </View>
                                <View style={{height: 40}}>
                                </View>
                                <View style={styles.payrollChildProp}>
                                    <View style={[styles.titleCont, {minWidth: 180,alignItems: 'flex-end', paddingRight: 40}]}>
                                        <Text style={styles.txtDefault}>TIN ID </Text>
                                    </View>
                                    <View style={styles.propCont}>
                                        <Text style={[styles.txtDefault,{paddingLeft: 15} ]}>123456789</Text>
                                    </View>
                                </View>
                            </View>
                            

                            : null
                    }

                    </CustomCard>
                </ScrollView>
            </View>
        );
    }
}