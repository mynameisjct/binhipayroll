import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from '../styles';

import SidebarFooterEmployer from './employer';
import SidebarFooterEmployee from './employee';

export default class SidebarFooter extends Component{
    render(){
        return(
            <SidebarFooterEmployer/>
        )
    }
}