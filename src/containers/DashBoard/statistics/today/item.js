
import React, { PureComponent } from 'react';
import { FlatList, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from '../styles';

class StatsTodayItem extends PureComponent {
    _getUpperBlockStyle = (oItem) => {
        if(oItem.contstatsbg && oItem.statsborderColor){
            return({
                backgroundColor: oItem.contstatsbg,
                borderTopWidth: 3,
                borderRightWidth: 3,
                borderLeftWidth: 3,
                borderColor: oItem.statsborderColor
            })
        }
        else{
            return null;
        }
    }
    
    _getLowerBlockStyle = (oItem) => {
        if(oItem.contlabelbg){
            return({
                backgroundColor: oItem.contlabelbg,
            })
        }
        else{
            return null;
        }
    }

    _getIconColor = (oItem) => {
        if(oItem.iconcolor){
            return String(oItem.iconcolor);
        }
        else{
            return String('#434646');
        }
    }

    _getTextStatStyle = (oItem) => {
        if(oItem.textstats){
            return ({
                color: String(oItem.textstats)
            })
        }
        else{
            return ({
                color: '#434646'
            })
        }
    }

    render(){
        const itemStyles = styles.todayItemStyles;
        const textStyles = styles.textStyles;
        const oItem = this.props.item;
        return(
            <View style={itemStyles.container}>

                <View 
                    style={[itemStyles.upperBlock, this._getUpperBlockStyle(oItem)]}>
                    <View style={itemStyles.statsDiv}>
                        <Text style={[textStyles.cardStats, this._getTextStatStyle(oItem)]}>
                            {oItem.value}
                        </Text>
                    </View>
                    <View style={itemStyles.iconDiv}>
                        <Icon name={oItem.icon} size={30} color={this._getIconColor(oItem)}/>
                    </View>
                    
                </View>

                <View style={[itemStyles.lowerBlock, this._getLowerBlockStyle(oItem)]}>
                    <Text style={textStyles.cardLabel}>
                        {oItem.label}
                    </Text>
                </View>
                
            </View>
        )
    }
}

export default StatsTodayItem;