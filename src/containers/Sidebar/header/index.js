import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from '../styles';

import SidebarHeaderEmployer from './employer';
import SidebarHeaderEmployee from './employee';

export default class SidebarHeader extends Component{
    render(){
        return(
            <SidebarHeaderEmployer/>
        )
    }
}