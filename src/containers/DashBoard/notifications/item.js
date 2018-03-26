//RN Packages andd Modules
import React, { PureComponent } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';

//Styles
import styles from './styles';

//Children Components
import NotificationsIcon from './icon';
import NotificationsDetails from './details';
import NotificationsGroupLabel from './groupLabel';

class NotificationsItem extends PureComponent {
    render(){
        const itemStyles = styles.itemStyles;
        if(
            (this.props.item.type.toUpperCase() === 'GROUPLABEL') ||
            (this.props.item.id == 0) 
        ){
            return(
                <NotificationsGroupLabel label={this.props.item.label}/>
            )
        }

        else{
            return(
                <TouchableNativeFeedback
                    onPress={this._onPressButton}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={itemStyles.container}> 
                        <View style={itemStyles.left}>
                            <NotificationsIcon {...this.props}/>
                        </View>
                        <View style={itemStyles.right}>
                            <NotificationsDetails {...this.props}/>
                        </View>
                    </View>
                    
                </TouchableNativeFeedback>
            )
        }
        
    }
}

export default NotificationsItem;