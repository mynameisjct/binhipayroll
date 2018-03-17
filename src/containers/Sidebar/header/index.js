import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import styles from '../styles';

import SidebarHeaderEmployer from './employer';

export default class SidebarHeader extends Component{
    render(){
        return(
            <SidebarHeaderEmployer loginInfo={this.props.loginInfo}/>
        )
    }
}