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

//Redux
import { connect } from 'react-redux';
import {
    SetLoginInfo, 
    SetActiveCompany
} from '../../actions';

export class Header3 extends Component {
    render(){
        const navigation = this.props.logininfo.navigation;
        const objRoute = Object.assign({}, this.props.routehistory);
        
        return(
            <View style={styles.container}>

                <TouchableNativeFeedback
                    onPress={() => {navigation.navigate('CompanyProfile')}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.headerLeft}>
                        <Icon name='md-close' size={30} color='#EEB843'/>
                    </View>
                </TouchableNativeFeedback>
                
                <View style={styles.headerCenter}>
                  <Text style={styles.headerTitle}>{objRoute.title}</Text>
                </View>

                <TouchableNativeFeedback
                    onPress={() => {}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.headerRight}>
                        <Text style={styles.txtBtn}>SAVE</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        routehistory: state.routeHistoryReducer.routehistory
    }
}

export default connect(
    mapStateToProps,
)(Header3)