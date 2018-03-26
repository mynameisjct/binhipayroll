
import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

//Styles
import styles from './styles';

//Children Components
import StatsToday from './today';
import StatsPayroll from './payrollStats';
import StatsAttendance from './attendance';

class StatsDetails extends Component {
    render(){
        const detailsStyles = styles.detailsStyles;
        return(
            <View style={detailsStyles.container}>
                <StatsToday {...this.props}/>
                <View style={detailsStyles.lowerBlock}>
                    <StatsPayroll {...this.props}/>
                    <StatsAttendance {...this.props}/>
                </View>
            </View>
        )
    }
}

export default StatsDetails;