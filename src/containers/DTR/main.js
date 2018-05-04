import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

//Children Components
import * as PromptScreen from '../../components/ScreenLoadStatus';

//Styles
import styles from './styles';
import DTRCalendar from './calendar';
import DTRHeader from './header';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as empDtrActions from './data/actions';

import {dtr} from './data';

export class EmployeeDTRCalendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            _bHasError: false,
            _bDidMount: false
        }
    }

    componentDidMount(){
        this._getDataFromDB('');
    }

    _getDataFromDB = (id) => {
        const activeProfile = this.props.employees.activeProfile.data;
        this.props.actions.empDtr.get({payrollid: id, employeeid: activeProfile.id ? activeProfile.id : ''});
    }
    /* componentDidMount(){
        setTimeout( () => {
            this.setState({_bDidMount: true});
        },100);
    } */
    
    render(){
        if(this.props.empDtr.status[0] == 1){
            return(
                <View style={styles.container}>
                    <View style={styles.dividerHeader}>
                        <DTRHeader 
                            data={this.props.empDtr.data}
                            onPeriodSwitch={this._getDataFromDB}
                        />
                    </View>
                    <View style={styles.dividerBody}>
                        <DTRCalendar data={this.props.empDtr.data} activeEmployee={this.props.employees.activeProfile.data}/>
                    </View>
                </View>
            )
        }else if(this.props.empDtr.status[0] == 0){
            return (
                <PromptScreen.PromptError title={'Daily Time Record. Check Employee Data.'} onRefresh={this._getDataFromDB}/>
            );
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

function mapStateToProps (state) {
    return {
        empDtr: state.dtr,
        employees: state.employees
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            empDtr: bindActionCreators(empDtrActions, dispatch),
        }
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeDTRCalendar)


