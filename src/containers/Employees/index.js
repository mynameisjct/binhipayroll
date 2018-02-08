//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

//Children Components
import List from './list';

//Styles Properties
import styles from './styles';

//Custom Components
import Header2 from '../Headers/header2';

//Children Components
import Summary from './summary';

export default class Employees extends Component {
    static navigationOptions = {
        header : 
            <Header2 title= 'MY EMPLOYEES'/>
    }
    
    render(){

        return(
            <View style={styles.container}>
                <List/>
                <Summary/>
            </View>
        )
    }
}
