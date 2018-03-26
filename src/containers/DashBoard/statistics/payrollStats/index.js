
import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

//Styles
import styles from '../styles';
import ChartCard from '../../../../components/chartCard';

class StatsPayroll extends Component {
    render(){
        const payrollStyles = styles.payrollStatsStyles;
        return(
            <ChartCard title='TEST'>
                <Text>HI!</Text>
            </ChartCard>
        )
    }
}

export default StatsPayroll;