
//RN Packages andd Modules
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsIcon = (props) => {
    let item = props.item;
    let iconName = '';
    let iconColor = '';
    switch(item.type.toUpperCase()){
        case 'ERROR':
            iconName = 'close-circle';
            iconColor = '#e82d27';
            break;

        case 'SUCCESS': 
            iconName = 'check-circle';
            iconColor = '#009602';
            break;

        case 'WARNING':
            iconName = 'alert-circle';
            iconColor = '#d8d300';
            break;

        case 'INFO':
            iconName = 'information';
            iconColor = '#04b9d3';
            break;
            
        default: 
            break
    }
    return(
        <Icon name={iconName} size={30} color={iconColor}/>
    )
}

export default NotificationsIcon;