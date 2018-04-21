import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

//Styles
import styles from './styles';

//Children Components
import EmployeeDTRCalendar from './main'

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as empDtrActions from './data/actions';

/* //API
import * as savingsApi from '../data/savings/api'; */

import {dtr} from './data';

export class EmployeeDTR extends Component {
    constructor(props){
        super(props);
        this.state = {
            _bHasError: false
        }
    }

    componentDidMount(){
        /* this.props.actions.empDtr.get(); */
    }

    render(){
        return(
            <EmployeeDTRCalendar/>
        )
    }
}

function mapStateToProps (state) {
    return {
        empDtr: state.dtr.data
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
)(EmployeeDTR)

