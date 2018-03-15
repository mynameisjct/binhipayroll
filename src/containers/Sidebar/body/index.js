import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from '../styles';

import SidebarBodyEmployer from './employer';
import SidebarBodyEmployee from './employee';

export default class SidebarBody extends Component{
    render(){
        return(
            <SidebarBodyEmployer/>
        )
    }
}