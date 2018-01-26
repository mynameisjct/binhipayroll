import React, { Component } from 'react';
import {
    View,
    Text, 
    Button,
    TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

//Redux
import { connect } from 'react-redux';
import {
    SetLoginInfo, 
    SetActiveCompany,
    SetRouteHistory
} from '../../actions';


export class Header4 extends Component {
    render(){
        const navigation = this.props.logininfo.navigation;
        return(
            <View style={styles.container}>

                <TouchableOpacity
                    onPress={() => {navigation.navigate('Employees')}}>
                    <View style={styles.headerLeft}>
                        <Icon name='window-close' style={{color: '#EEB843', fontSize: 35}} />
                    </View>
                </TouchableOpacity>
                
                <View style={styles.headerCenter}>
                  <Text style={styles.headerTitle}>{this.props.title}</Text>
                </View>

                <View style={[styles.headerRight, {width: 120}]}>
                    <Text>SAVE AS DRAFT</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany
    }
}

export default connect(
    mapStateToProps,
)(Header4)