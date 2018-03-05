import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

//Styles
import styles from './styles';
import DTRCalendar from './calendar';
import DTRHeader from './header';

export default class EmployeeDTR extends Component {
    constructor(props){
        super(props);
        this.state = {
            _bHasError: false
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.dividerHeader}>
                    <DTRHeader/>
                </View>
                <View style={styles.dividerBody}>
                    <DTRCalendar/>
                </View>
            </View>
        )
    }
}
