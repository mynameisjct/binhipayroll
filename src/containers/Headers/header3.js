import React, { Component } from 'react';
import {
    View,
    Text, 
    Button,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export default class Header3 extends Component {
    render(){
        return(
            <View style={styles.container}>

                <TouchableNativeFeedback
                    onPress={() => {alert('this should close the form.')}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.headerLeft}>
                        <Icon name='md-close' size={30} color='#EEB843'/>
                    </View>
                </TouchableNativeFeedback>
                
                <View style={styles.headerCenter}>
                  <Text style={styles.headerTitle}>{this.props.title}</Text>
                </View>

                <TouchableNativeFeedback
                    onPress={() => {alert('this should save the data from form to DB.')}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.headerRight}>
                        <Text style={styles.txtBtn}>SAVE</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        );
    }
}