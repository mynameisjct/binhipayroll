import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';

class MyHomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./chats-icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.navigate('DrawerToggle')}
          title="Open Drawer"
        />
      );
    }
  }
  
  class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Notifications',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./notif-icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      );
    }
  }
  
  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });
  
  const EmpeDTR = DrawerNavigator({
    Home: {
      screen: MyHomeScreen,
    },
    Notifications: {
      screen: MyNotificationsScreen,
    },
  });

  export default EmpeDTR;

/* import React, { Component } from 'react';
import {
    View,
    Text, 
    Button
} from 'react-native';

export default class EmpeDTR extends Component {
    render(){
        return(
            <View>
                <Text>This will display DTR</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    title="Open Drawer"
                />
            </View>
        );
    }
} */