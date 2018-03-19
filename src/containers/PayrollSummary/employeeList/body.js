import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from '../styles';

export default class PayrollEmployeeListBody extends Component {
    _keyExtractor = (item, index) => item.id;

    render(){
        const bodyStyles = styles.listStyles.body;
        return(
            <View style={bodyStyles.container}>
                <FlatList
                    contentContainerStyle={bodyStyles.listComponent}
                    ref={(ref) => { this.ref_payrollSummaryEmployeeList = ref; }}
                    data={this.props.data.employeelist.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => 
                        <EmployeePayrollCard item={item}/>
                    }
                />
            </View>
        );
    }
}

class EmployeePayrollCard extends Component {
    onActionSelected = (position) => {
        if (position === 0) { // index of 'Settings'
          showSettings();
        }
    }

    render(){
        const bodyStyles = styles.listStyles.body;
        const cardHeaderStyles = styles.listStyles.body.cardHeader;
        const cardBodyStyles = styles.listStyles.body.cardBody;
        const textStyles = styles.textStyles;
        const item = this.props.item;

        return(
            <View style={bodyStyles.placeholder}>
                <View style={cardHeaderStyles.container}>
                    <View style={cardHeaderStyles.left}>
                        <View style={cardHeaderStyles.icon}>
                            <Icon name='account-circle' size={70} color='#434646'/>
                        </View>
                        <View style={cardHeaderStyles.title}>
                            <Text style={textStyles.name}>{item.name}</Text>
                            <Text style={textStyles.description}>{item.position}</Text>
                            <Text style={textStyles.description}>{item.branch}</Text>
                        </View>
                    </View>
                    <View style={cardHeaderStyles.right}>
                        <Icon name='dots-vertical' size={30} color='#434646'/>
                    </View>
                </View>
                <View style={cardBodyStyles.container}>
                    {
                        item.summary.map((data, index) => 
                            <View key={index} style={cardBodyStyles.content}>
                                <View style={cardBodyStyles.label}>
                                    <Text style={index === (item.summary.length-1) ? textStyles.summaryBold : textStyles.summary}>
                                        {data[0]}
                                    </Text>
                                </View>
                                <View style={cardBodyStyles.value}>
                                    <Text style={index === (item.summary.length-1) ? textStyles.summaryBold : textStyles.summary}>
                                        {data[1]}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }
}