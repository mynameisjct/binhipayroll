import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export default class TransactionsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            _oList: [
                [
                    {
                        id: '001',
                        name: 'Daily Time Record\nModification',
                        icon: 'timetable',
                        iconSize: '40'
                    },
                    {
                        id: '002',
                        name: 'Leave\nApplication',
                        icon: 'timer-off'
                    },
                    {
                        id: '003',
                        name: 'Overtime\nApplication',
                        icon: 'clock-fast'
                    }
                ],
                [
                    {
                        id: '004',
                        name: 'Special Deductions\n& Allowances',
                        icon: 'format-list-numbers'
                    },
                    {
                        id: '005',
                        name: 'Run Payroll',
                        icon: 'calculator'
                    },
                    {
                        id: null,
                        name: null
                    }
                ]
            ]
        }
    }

    _onTriggerAction = () => {
        
    }

    render(){
        let aList = this.state._oList;
        let btnStyle = styles.btn
        return(
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    {
                        aList.map((oRow, rowIndex) => 
                            <View key={rowIndex} style={styles.contRow}>
                                    {
                                        oRow.map((oCol, colIndex) =>
                                            !oCol.id ?
                                                <View key={colIndex} style={[styles.contCol, styles.contEmpty]}>
                                                </View>
                                            :
                                                <TouchableOpacity
                                                    activeOpacity={0.6}
                                                    key={colIndex} 
                                                    style={styles.contCol}
                                                    onPress={() => this._onTriggerAction(oCol)}>
                                                    <View style={btnStyle.container}>
                                                        <View style={btnStyle.icon}>
                                                            <Icon name={oCol.icon} size={35} color='#505251'/>
                                                        </View>
                                                        <View style={btnStyle.label}>
                                                            <Text style={btnStyle.txt}>{oCol.name}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                        )
                                    }
                            </View>
                        )
                    }
                </View>
            </View>
        );
    }
}