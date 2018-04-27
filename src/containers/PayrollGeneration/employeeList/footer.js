import React, { Component } from 'react';
import {
    View,
    Text,
    Switch
} from 'react-native';

//Styles
import styles from '../styles';

export default class PayrollEmployeeListFooter extends Component {
    _toggleMark = (value) => {

    }

    render(){
        const switchThumbColor = this.props.data.markallasclosed ? '#EEB843' : '#D1D4D6';
        const footerStyles = styles.listStyles.footer;
        const textStyles = styles.textStyles;
        const oEmpList = this.props.data.employeelist;

        return(
            <View style={footerStyles.container}>
                <View style={footerStyles.left}>
                    <Text style={textStyles.footerLabels}>{'Status: ' + oEmpList.status}</Text>
                </View>
                <View style={footerStyles.right}>
                    <View style={footerStyles.label}>
                        <Text style={textStyles.footerLabels}>Mark All as Closed</Text>
                    </View>
                    <View style={footerStyles.box}>
                        <Switch
                            thumbTintColor={switchThumbColor}
                            style={{}}
                            onValueChange={this._toggleMark} 
                            value={oEmpList.markallasclosed}
                        />
                    </View>
                </View>
            </View>
        );
    }
}