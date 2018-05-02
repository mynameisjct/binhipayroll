import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import styles from '../styles';
import * as session from '../../../services/session';

class SidebarFooterEmployer extends Component{
    constructor(props){
        super(props);
        this.state = {
            _list: [
                {
                    key: "0001",
                    label: "Settings",
                    iconName: 'md-settings',
                    iconSize: 20,
                    iconColor: '#434646',
                    navigateTo: 'EmprDashBoard',
                },
                {
                    key: "0002",
                    label: "Sync",
                    iconName: 'md-sync',
                    iconSize: 23,
                    iconColor: '#434646',
                    navigateTo: 'CompanyPolicies',
                    isActive: false
                },
                {
                    key: "0003",
                    label: "Logout",
                    iconName: 'md-power',
                    iconSize: 20,
                    iconColor: '#434646',
                    navigateTo: 'Login',
                    isActive: false
                }
            ],
        }
    }

    _onItemPress = (data) => {
        console.log('data: ' + JSON.stringify(data));
        switch(data.key){
            case '0001':
                break;
            case '0002':
                break;
            case '0003':
                session.revoke()
                .then((res)=>{
                    if(res.flagno == 1){
                        session.clearSession();
                        this.props.navigation.navigate(data.navigateTo);
                    }else{

                    }
                }).catch((exception)=> {
                    console.log(exception);
                });
                break;
        }
    }

    _navigateToProfile = () => {

    }

    render(){
        const footerStyles = styles.footer;
        const textStyles = styles.textStyles;
        console.log('this.props.loginInfo: ' + JSON.stringify(this.props.loginInfo));
        const loginInfo = this.props.loginInfo;
        return(
            <View style={footerStyles.container}>
                <TouchableNativeFeedback
                    onPress={this._navigateToProfile}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={footerStyles.profile.container}>
                        <View style={footerStyles.profile.icon}>
                            <Icon 
                                size={35} 
                                name='md-person'
                                color='#434646'  />
                        </View>
                        <View style={footerStyles.profile.label}>
                            <Text style={textStyles.profileTitle}>
                                {loginInfo.resFName + ' ' + loginInfo.resMName + ' ' + loginInfo.resLName}
                            </Text>
                            <Text style={textStyles.profileLabel}>
                                My Profile
                            </Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <View style={footerStyles.bottom}>
                    {
                        this.state._list.map((data,index) => 
                            <TouchableNativeFeedback
                                key={data.key}
                                onPress={() => {this._onItemPress(data)}}
                                background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={footerStyles.item}>
                                    <View style={footerStyles.icon}>
                                        <Icon 
                                            size={data.iconSize} 
                                            name={data.iconName} 
                                            color={data.iconColor} />
                                    </View>
                                    <View style={footerStyles.label}>
                                        <Text style={textStyles.profileLabel}>
                                            {data.label}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        )  
                    }
                </View>
                
                
            </View>
        )
    }
}

export default withNavigation(SidebarFooterEmployer)