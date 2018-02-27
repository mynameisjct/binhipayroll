import React, { Component } from 'react';
import {
    View,
    Text, 
    Button,
    TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';

import styles from './styles';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    SetLoginInfo, 
    SetActiveCompany,
    SetRouteHistory
} from '../../actions';
import * as empFormActions from '../Employees/data/addFormNavigator/actions';

export class Header4 extends Component {

    _triggerNext = () => {
        let nav =  this.props.navigation.state.routes[0];
        let activeGroupIndex = nav.index;
        let activeFormIndex = nav.routes[activeGroupIndex].index;
        let activeRouteKey = nav.routes[activeGroupIndex].routes[activeFormIndex].key;
        
        this.props.actions.empForm.triggerNext(activeRouteKey);
    }

    render(){
        return(
            <View style={styles.container}>

                <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate('Employees')}}>
                    <View style={styles.specialForm.headerLeft}>
                        <Icon name='window-close' style={{color: '#EEB843', fontSize: 35}} />
                    </View>
                </TouchableOpacity>
                
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>{this.props.title}</Text>
                </View>

                <View style={styles.specialForm.headerRight}>
                    {
                        /* this.props.navigation.state.routes[0].routes[0].index === 0 ?
                            null
                        :
                            <TouchableOpacity
                                style={styles.specialForm.contBtn}
                                onPress={() => {this.props.actions.empForm.next()}}>
                                <View style={styles.specialForm.contBtnWrapper}>
                                    <View style={styles.specialForm.contIcon.left}>
                                        <Icon name='chevron-left' color='#EEB843' size={35} />
                                    </View>
                                    <View style={styles.specialForm.contLabel.left}>
                                        <Text>BACK</Text>
                                    </View>
                                </View>
                            </TouchableOpacity> */
                    }
                    
                    <TouchableOpacity
                        style={styles.specialForm.contBtn}
                        onPress={this._triggerNext}>
                            <View style={styles.specialForm.contBtnWrapper}>
                                <View style={styles.specialForm.contLabel.right}>
                                    <Text>NEXT</Text>
                                </View>
                                <View style={styles.specialForm.contIcon.right}>
                                    <Icon name='chevron-right' color='#EEB843' size={35} />
                                </View>
                            </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}


function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        formTriggerNext: state.employees.formTriggerNext
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            empForm: bindActionCreators(empFormActions, dispatch),
        },
    }
  }

export default withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header4))