//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput,
    Modal,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from './styles';
import TabsFooter from './footer';
import PersonalInfo from './personalinfo';

//Custom Components
import Header4 from '../../Headers/header4';

export default class AddEmployeeForm extends Component {
    static navigationOptions = {
        header : 
            <Header4 title= 'ADD NEW EMPLOYEE'/>
    }

    render(){

        return(
            <View style={styles.container}>
                <TabsFooter/>
            </View>
        )
    }
}
