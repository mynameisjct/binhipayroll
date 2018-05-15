//Packages
import React, { Component, PureComponent } from 'react';
import { View, Text } from 'react-native';

//Styles Properties
import styles from './styles';

//Children Components
import Header2 from '../Headers/header2';
import Notifications from './notifications';
import DashboardStatistics from './statistics'
import GenericContainer from '../../components/GenericContainer';

//Constatants
const TITLE = 'DASHBOARD';

export default class EmprDashBoard extends Component {
    constructor(props){
        super(props);
        this.state={
            _status: false
        }
    }

    static navigationOptions = {
        header : 
            <Header2 title= 'DASHBOARD'/>
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({ _status: [1, 'Component Mounted.'] });
        },100);
    }

    render(){
        return(
            <GenericContainer
                containerStyle={styles.container}
                status={this.state._status}
                title={TITLE}
            >
                <View style={styles.left}>
                    <Notifications/>
                </View>
                <View style={styles.right}>
                    <DashboardStatistics/>
                </View>
            </GenericContainer>
                
        )
    }
}