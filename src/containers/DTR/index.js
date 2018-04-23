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


/* //API
import * as savingsApi from '../data/savings/api'; */

import {dtr} from './data';

export default class EmployeeDTR extends Component {
    constructor(props){
        super(props);
        this.state = {
            _bHasError: false
        }
    }

    render(){
      return(
            <EmployeeDTRCalendar/>
        )
    }
}
