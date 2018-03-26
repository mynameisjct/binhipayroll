//Packages
import React, { Component, PureComponent } from 'react';
import { View, Text } from 'react-native';

//Styles Properties
import styles from './styles';

//Children Components
import Header2 from '../Headers/header2';
import Notifications from './notifications';
import DashboardStatistics from './statistics'

export default class EmprDashBoard extends Component {
    static navigationOptions = {
        header : 
            <Header2 title= 'DASHBOARD'/>
    }

    componentDidMount(){
 
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.left}>
                    <Notifications/>
                </View>
                <View style={styles.right}>
                    <DashboardStatistics/>
                </View>
            </View>
        )
    }
}