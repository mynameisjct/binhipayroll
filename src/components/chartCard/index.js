import React, { Component } from 'react';
import { View, Text } from 'react-native';

//Styles
import styles from './styles';

//Children Components
import ChartCardHeader from './header';

class ChartCard extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ChartCardHeader {...this.props}/>
                { this.props.children }
            </View>
        )
    }   
}

export default ChartCard