import React, { Component, PureComponent } from 'react';
import {
    View,
    Text
} from 'react-native';

//Styles
import styles from './styles';

export default class ReportContent extends Component{
    render(){
        let contentStyles = styles.reportContentStyle;
        let item = this.props.item;
        return(
            <View style={contentStyles.container}>
                <View style={contentStyles.contBody}>
                    {this.props.body}
                </View>

                <View style={contentStyles.contFilter}>
                    <View style={contentStyles.contFilterTitle}>
                        <Text style={contentStyles.txtFilterTitle}>
                            Filters
                        </Text>
                    </View>
                </View>
                
            </View>
        )
    }
}