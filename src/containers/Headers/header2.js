import React, { Component } from 'react';
import {
    View,
    Text, 
    Button,
    TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export default class Header2 extends Component {
    static navigationOptions = {
        header : null,
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.headerLeft}>
                </View>
                
                <View style={styles.headerCenter}>
                  <Text style={styles.headerTitle}>{this.props.title}</Text>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={() => {this.props.onBtnPress()}}>
                        <Icon name='md-menu' style={{color: '#EEB843', fontSize: 35}} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}