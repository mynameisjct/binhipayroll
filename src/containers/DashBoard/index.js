import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class EmprDashBoard extends Component {
    static navigationOptions = {
        headerTitle : 'DASHBOARD',
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }
    render(){
        return(
            <View>
                <Text>This will display Employer Dash Board</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('DrawerToggle')}
                    title="Open Drawer"
                />
            </View>
        );
    }
}