import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class EmprDashBoard extends Component {
    static navigationOptions = {
        headerTitle : 
            <View style={{flex: -1, width: 1000, justifyContent: 'center', alignItems: 'center'}}>
                <Text 
                    style={{fontFamily: 'Helvetica-Bold', fontSize: 20, fontWeight: '300', color: '#434646'}}>
                    DASHBOARD
                </Text>
            </View>,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }
    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>This will display Employer Dash Board</Text>
{/*                 <Button
                    onPress={() => this.props.navigation.navigate('DrawerToggle')}
                    title="Open Drawer"
                /> */}
            </View>
        );
    }
}