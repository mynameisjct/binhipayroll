//RN Packages andd Modules
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

class NotificationsHeader extends Component {
    render(){
        const headerStyles=styles.headerStyles;
        const notificationIconStyle=styles.headerStyles.notificationCount.error;
        const textStyles=styles.textStyles;
        const countTextStyle=styles.textStyles.notification.error;
        
        return(
            <View style={headerStyles.container}>
                <View style={headerStyles.left}>
                    <Text style={textStyles.title}>
                        NOTIFICATIONS
                    </Text>
                </View>
                <View style={headerStyles.right}>
                    <View style={notificationIconStyle}>
                        <Text style={countTextStyle}>3</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default NotificationsHeader;