import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

export default class NavigationItem extends PureComponent{
    render(){
        console.log('this.props.item.hasSpecialCol: ' + this.props.item.hasSpecialCol || '');
        console.log('this.props.item.isSpecialColLoading: ' + this.props.item.isSpecialColLoading || '');
        const itemStyles = styles.body.item;
        const textStyles = styles.textStyles;
        return(
            <TouchableNativeFeedback
                onPress={() => this.props.onItemPress(this.props.item)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={[itemStyles.container, this.props.item.isActive ? itemStyles.active : {}]}>
                    <View style={itemStyles.left}>
                        <Icon 
                            size={this.props.item.iconSize} 
                            name={this.props.item.iconName} 
                            color={this.props.item.iconColor} />
                    </View>
                    <View style={itemStyles.middle}>
                        <Text style={textStyles.navigationLabel}>
                            {this.props.item.label}
                        </Text>
                    </View>
                    <View style={itemStyles.right}>
                        {
                            this.props.item.hasSpecialCol || false ? 
                                this.props.item.isSpecialColLoading || false ? 
                                    <View style={itemStyles.specialColLoading}>
                                        <ActivityIndicator
                                            animating = {this.props.item.isSpecialColLoading}
                                            color = '#EEB843'
                                            size = "small"/>
                                    </View>
                                :
                                    <View style={itemStyles.specialCol}>
                                        <Text style={this.props.item.notificationsCount > 0 ? textStyles.notification.error : textStyles.notification.normal}>
                                            {this.props.item.notificationsCount}
                                        </Text>
                                        <Icon 
                                            size={this.props.item.notificationsIconSize} 
                                            name={this.props.item.notificationsIconName} 
                                            color={this.props.item.notificationsCount > 0 ?
                                                itemStyles.notificationIcon.error :
                                                itemStyles.notificationIcon.normal}  
                                        />
                                    </View>
                            :
                                null

                        }
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}