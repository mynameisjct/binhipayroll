import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class EmprDashBoard extends Component {
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