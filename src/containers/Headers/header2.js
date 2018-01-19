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

//Redux
import { connect } from 'react-redux';
import {
    SetLoginInfo, 
    SetActiveCompany,
    SetRouteHistory
} from '../../actions';


export class Header2 extends Component {
    render(){
        const navigation = this.props.logininfo.navigation;
        return(
            <View style={styles.container}>

                <View style={styles.headerLeft}>
                </View>
                
                <View style={styles.headerCenter}>
                  <Text style={styles.headerTitle}>{this.props.title}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => {navigation.navigate('DrawerToggle')}}>
                    <View style={styles.headerRight}>
                        <Icon name='md-menu' style={{color: '#EEB843', fontSize: 35}} />
                    </View>
                </TouchableOpacity>
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
)(Header2)