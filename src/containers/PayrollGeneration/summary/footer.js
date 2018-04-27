import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';

//Styles
import styles from '../styles';

export default class PayrollGenerationInfoFooter extends Component {
    render(){
        const footerStyles = styles.summaryStyles.footer;
        const textStyles = styles.textStyles;
        
        return(
            <View style={footerStyles.container}>
                <View style={footerStyles.content}>
                    <View style={footerStyles.upperBlock}>
                        <TouchableNativeFeedback
                            onPress={() => {alert('TEMPORARY ALERT')}}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={[footerStyles.btn, footerStyles.btnCancel]}>
                                <Text style={textStyles.btnText}>
                                    CANCEL
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={() => {alert('TEMPORARY ALERT')}}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={[footerStyles.btn, footerStyles.btnRegenerate]}>
                                <Text style={textStyles.btnTextError}>
                                    REGENERATE
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={footerStyles.lowerBlock}>
                        <TouchableNativeFeedback
                            onPress={() => {alert('TEMPORARY ALERT')}}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={[footerStyles.btn, footerStyles.btnPost]}>
                                <Text style={textStyles.btnText}>
                                    POST
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        );
    }
}