
import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Styles
import styles from './styles';

class StatsHeader extends Component {
    render(){
        const headerStyles = styles.headerStyles;
        const oData = this.props.data;
        const textStyles = styles.textStyles;

        return(
            <View style={headerStyles.container}>

                <View style={headerStyles.content}>
                    <View style={headerStyles.left}>
                        <Icon name='md-home' size={40} color='#434646'/>
                    </View>
                    <View style={headerStyles.right}>
                        <Text numberOfLines={1} style={textStyles.headerLabel}>
                            {oData.companyinfo.label}
                        </Text>
                        <Text numberOfLines={2} style={textStyles.companyName}>
                            {oData.companyinfo.value}
                        </Text>
                    </View>
                </View>
                
                <View style={headerStyles.content}>
                    <View style={headerStyles.left}>
                        <Icon name='ios-people' size={40} color='#434646'/>
                    </View>
                    <View style={headerStyles.right}>
                        <Text numbe rOfLines={1} style={textStyles.headerLabel}>
                            {oData.employees.label}
                        </Text>
                        <Text numberOfLines={1} style={textStyles.headerValue}>
                            {oData.employees.value}
                        </Text>
                    </View>
                </View>

                <View style={[headerStyles.content, {borderWidth: 0}]}>
                    <View style={headerStyles.left}>
                        <Icon name='ios-briefcase' size={40} color='#434646'/>
                    </View>
                    <View style={headerStyles.right}>
                        <Text numberOfLines={1} style={textStyles.headerLabel}>
                            {oData.workingdays.label}
                        </Text>
                        <Text numberOfLines={1} style={textStyles.headerValue}>
                            {oData.workingdays.value}
                        </Text>
                    </View>
                </View>
                
            </View>
        )
    }
}

export default StatsHeader;