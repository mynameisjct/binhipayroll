//RN Packages andd Modules
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

class NotificationsGroupLabel extends Component {
    render(){
        const groupLabelStyles= styles.groupLabelStyles;
        const labelTextStyle=styles.textStyles.groupLabel;

        return(
            <View style={groupLabelStyles.container}>
                <Text style={styles.labelTextStyle}>{this.props.label}</Text>
            </View>
        )
    }
}

export default NotificationsGroupLabel;