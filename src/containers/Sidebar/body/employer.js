import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

//Children Components
import NavigationItem from './navigationItem';

//Styles
import styles from '../styles';

export default class SidebarBodyEmployer extends Component{
    constructor(props){
        super(props);
        this.state = {
            _employerNavigationList: [
                {
                    key: "0001",
                    label: "Dashboard",
                    iconName: 'md-apps',
                    iconSize: 25,
                    iconColor: '#434646',
                    navigateTo: 'EmprDashBoard',
                    isActive: true,
                    hasSpecialCol: true,
                    isSpecialColLoading: true,
                    notificationsCount: 1,
                    notificationsIconName: 'md-notifications-outline',
                    notificationsIconSize: 22
                },
                {
                    key: "0002",
                    label: "Company Policies",
                    iconName: 'ios-book',
                    iconSize: 25,
                    iconColor: '#434646',
                    navigateTo: 'CompanyPolicies',
                    isActive: false
                },
                {
                    key: "0003",
                    label: "My Employees",
                    iconName: 'ios-people',
                    iconSize: 25,
                    iconColor: '#434646',
                    navigateTo: 'Employees',
                    isActive: false
                },
                {
                    key: "0004",
                    label: "Transactions",
                    iconName: 'ios-card',
                    iconSize: 25,
                    iconColor: '#434646',
                    navigateTo: 'Transactions',
                    isActive: false
                },
                {
                    key: "0005",
                    label: "Reports",
                    iconName: 'md-list-box',
                    iconSize: 25,
                    iconColor: '#434646',
                    navigateTo: 'Reports',
                    isActive: false
                },
                
            ]
        }
    }

    _onItemPress = (oItem) => {
        let oList = JSON.parse(JSON.stringify(this.state._employerNavigationList));
        console.log('_onItemPress(oItem): ' + JSON.stringify(oItem));
        oList.map((data, index) => {
            if(data.key === oItem.key){
                data.isActive = true;
            }
            else{ 
                data.isActive = false;
            }
        })
        this.setState({ _employerNavigationList: oList });
        requestAnimationFrame(() => {
         
        })
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