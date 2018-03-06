import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import styles from './styles';

export default class DTRItem extends Component {
    render(){
        let itemStyle = styles.itemStyle;
        return(
            <View style={[itemStyle.propPlaceholder, this.props.hideBorder || false ? {borderBottomWidth: 0} : {}]}>
                <View style={itemStyle.row}>
                <View style={itemStyle.colName}>
                    <View style={itemStyle.colDivider}>
                    <View style={itemStyle.contDividerContent}>
                        <Text style={itemStyle.txtName}>{this.props.name || ''}</Text>
                    </View>
                    {
                        this.props.remarks === '' || this.props.remarks===null ?
                        null
                        :
                        <View style={itemStyle.contDividerContent}>
                            <Text style={[itemStyle.txtRemarks, this.props.remarksColor || false ? {color: this.props.remarksColor} : {}]}>
                            {this.props.remarks}
                            </Text>
                        </View>
                    }
                    </View>
                </View>
                <View style={itemStyle.colVal}>
                    <Text style={itemStyle.txtValue}>{this.props.value || ''}</Text>
                </View>
                <View style={itemStyle.colBtn}>
                    {
                    this.props.showButton || false ?
                        <TouchableOpacity 
                            style={itemStyle.btn.container}
                            onPress={ () => this.props.onPress(this.props.date, this.props.value)}>
                            <Text style={itemStyle.btn.txtLabel}>{this.props.buttonTitle}</Text>
                        </TouchableOpacity> 
                    :
                        null
                    }
                </View>
                </View>
            </View>
        )
    }
}