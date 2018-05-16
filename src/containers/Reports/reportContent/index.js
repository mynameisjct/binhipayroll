import React, { Component, PureComponent } from 'react';
import {
    View,
    Text
} from 'react-native';

//Styles
import styles from '../styles';

export default class ReportContent extends Component{
    _keyExtractor = (item, index) => item.id;

    render(){
        let contentStyles = styles.reportContentStyle;
        let item = this.props.item;
        return(
            <View style={contentStyles.container}>
                <View style={contentStyles.contContent}>
                    <View style={contentStyles.contHeader}>
                        <Text style={contentStyles.txtHeaderTitle}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={contentStyles.contBody}>
                        {this.props.body}
                    </View>
                </View>

                <View style={contentStyles.contFilter}>
                    <View style={contentStyles.contFilterTitle}>
                        <Text style={contentStyles.txtFilterTitle}>
                            FILTERS
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
                    