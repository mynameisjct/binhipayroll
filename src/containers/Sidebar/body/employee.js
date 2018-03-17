import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Children Components
import NavigationItem from './navigationItem';

//Styles
import styles from '../styles';

//helper
import * as oHelper from '../../../helper';

class SidebarBodyEmployee extends Component{
    constructor(props){
        super(props);
        this.state = {
            _employerNavigationList: [
                {
                    key: "0001",
                    label: "Daily Time Record",
                    iconName: 'timetable',
                    iconSize: 25,
                    iconColor: '#434646',
                    isMaterialCommunityIcons: true,
                    navigateTo: 'EmployeeDTR',
                    isActive: true,
                },

                {
                    key: "0002",
                    label: "Personal Information",
                    iconName: 'information-variant',
                    iconSize: 25,
                    iconColor: '#434646',
                    isMaterialCommunityIcons: true,
                    navigateTo: 'CompanyPolicies',
                    isActive: false
                },

                {
                    key: "0003",
                    label: "Bank Information",
                    iconName: 'bank',
                    iconSize: 25,
                    iconColor: '#434646',
                    isMaterialCommunityIcons: true,
                    navigateTo: 'CompanyPolicies',
                    isActive: false
                },

                {
                    key: "0004",
                    label: "Employment Information",
                    iconName: 'file-document',
                    iconSize: 25,
                    iconColor: '#434646',
                    isMaterialCommunityIcons: true,
                    navigateTo: 'Employees',
                    isActive: false
                },

                {
                    key: "0005",
                    label: "Reports",
                    iconName: 'chart-pie',
                    iconSize: 25,
                    iconColor: '#434646',
                    isMaterialCommunityIcons: true,
                    navigateTo: 'Transactions',
                    isActive: false
                },
            ]
        }
    }

    _onItemPress = (oItem) => {
        if(!oItem.isActive){
            let strAddress = '';
            let oList = oHelper.copyObject(this.state._employerNavigationList);
            console.log('_onItemPress(oItem): ' + JSON.stringify(oItem));
            this.props.navigation.navigate(oItem.navigateTo);
            oList.map((data, index) => {
                if(data.key === oItem.key){
                    data.isActive = true;
                }
                else{ 
                    data.isActive = false;
                }
            })
            this.setState({ _employerNavigationList: oList });
        }
    }

    render(){
        return(
            <View style={styles.body.container}>
                <FlatList
                    ref={(ref) => { this.ref_sidebar = ref; }}
                    data={this.state._employerNavigationList}
                    renderItem={({item}) => 
                        <NavigationItem
                            item={item}
                            onItemPress={this._onItemPress}/>
                    }
                />
            </View>
        )
    }
}

export default withNavigation(SidebarBodyEmployee)