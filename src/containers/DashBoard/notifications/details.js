//RN Packages andd Modules
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const NotificationsDetails = (props) => {
    const aDetails = props.item.details;
    const textStyles = styles.textStyles;
    return(
        <View>
            {
                aDetails.map((data, index) =>
                    <Text 
                        key={data}
                        style={textStyles.notification.details}>

                        {data}

                    </Text>
                )
            }
        </View>
    )
}

export default NotificationsDetails;