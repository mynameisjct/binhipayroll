import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    Picker,
    TimePickerAndroid,
    ScrollView,
    TextInput,
    TouchableOpacity,
    RefreshControl,
    TouchableNativeFeedback,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabNavigator } from 'react-navigation';

import Tardiness from '../Rules/tardiness';
import Undertime from '../Rules/undertime';
import Overtime from '../Rules/overtime';
import Leaves from '../Rules/leaves';

import styles from './styles';

const InfoScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Rank Information Screen</Text>
    </View>
);

class TardinessScreen extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={{ flex: 1}}>
                <Tardiness status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}
 
class UndertimeScreen extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={{ flex: 1}}>
                <Undertime status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}

class OvertimeScreen extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={{ flex: 1}}>
                <Overtime status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}

class LeavesScreen extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={{ flex: 1}}>
                <Leaves status={[1, 'Success']} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}


export default class Ranks extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.contRootTabs}>
                    <TabsRoot/>
                </View>
            </View>
        );
    }
}

export const TabsRoot = TabNavigator({
    Info: {
      screen: InfoScreen,
      navigationOptions: {
        tabBarLabel: 'RANK INFO',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Tardiness: {
      screen: TardinessScreen,
      navigationOptions: {
        tabBarLabel: 'TARDINESS',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Undertime: {
      screen: UndertimeScreen,
      navigationOptions: {
        tabBarLabel: 'Undertime',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Overtime: {
      screen: OvertimeScreen,
      navigationOptions: {
        tabBarLabel: 'Overtime',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Leaves: {
      screen: LeavesScreen,
      navigationOptions: {
        tabBarLabel: 'Leaves',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  });