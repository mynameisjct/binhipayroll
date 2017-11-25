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
    SetActiveCompany,
    SetActiveBranch,
    SetDataActionTrigger
} from '../../actions';

export class Header3 extends Component {

    _onSave = () => {
        this.props.dispatchDataActionTrigger({
            saveTrigger: true
        })
    }
    
    _enableSaveBtn = () => {
        let dataactiontrigger = Object.assign({}, this.props.dataactiontrigger);
        if(dataactiontrigger.enableSave){
            return({
                /* color: '#EEB843' */
                color: 'red'
            })
        }
        else{
            return({
                /* color: 'rgba(230, 141, 0, 0.5);' */
                /* color: 'blue' */
                color: '#EEB843'
            })
        }
    }

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
                    onPress={() => {this._onSave()}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.headerRight}>
                        <Text style={[styles.txtBtn, this._enableSaveBtn()]}>SAVE</Text>
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
        routehistory: state.routeHistoryReducer.routehistory,
        dataactiontrigger: state.dataActionTriggerReducer.dataactiontrigger
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchDataActionTrigger: (dataactiontrigger) => {
            dispatch(SetDataActionTrigger(dataactiontrigger))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header3)