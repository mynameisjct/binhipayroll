import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

//Styles
import styles from './styles';
import DTRCalendar from './calendar';
import DTRHeader from './header';

import {dtr} from './data';

export default class EmployeeDTRCalendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            _bHasError: false,
            _bDidMount: false
        }
    }

    componentDidMount(){
        setTimeout( () => {
            this.setState({_bDidMount: true});
        },100);
    }
    
    render(){
        if(this.state._bDidMount){
            return(
                <View style={styles.container}>
                    <View style={styles.dividerHeader}>
                        <DTRHeader data={dtr}/>
                    </View>
                    <View style={styles.dividerBody}>
                        <DTRCalendar data={dtr}/>
                    </View>
                </View>
            )
        }
        
        else{
            return(
                <View style={styles.emptyContainer}>
                    <ActivityIndicator size="small" color="#EEB843" />
                </View>
            )
        }
    }
}
