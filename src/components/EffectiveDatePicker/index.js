import React, { Component } from 'react';
import {
    View,
    Text, 
    TouchableNativeFeedback,
    Picker,
    ScrollView
} from 'react-native';

import styles from './styles';

//Helper
import * as oHelper from '../../helper';

export default class EffectiveDatePicker extends Component {
    
    _setActiveData = (itemValue) => {
        this.props.onChange(itemValue);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.contInfo}>
                    <View style={styles.contInfoLabel}>
                        <Text style={styles.txtInfo}>
                            Effective Date:
                        </Text>
                    </View>
                    <View style={styles.contInfoData}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.namePickerStyle}
                                selectedValue={String(this.props.selectedValue)}
                                onValueChange={(itemValue, itemIndex) => {
                                    this._setActiveData(itemValue);
                                    }}>
                                {
                                    this.props.options.map((oData, index) =>
                                        <Picker.Item key={index} label={oHelper.convertRangeDateToString(oData.effectivedate)} value={String(oData.id)} />
                                    )
                                }
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={styles.remarks.container}>
                    {/* <View style={styles.remarks.bottom}>
                        <ScrollView contentContainerStyle={styles.remarks.scrollview}>
                            <Text>Remarks</Text>  
                        </ScrollView>
                    </View> */}
                </View>
            </View>
        )
    }
}