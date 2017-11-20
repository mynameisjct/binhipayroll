import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header2 from '../Headers/header2';

export default class EmprDashBoard extends Component {
    constructor(props){
        super(props);
    }
/*     componentWillMount() {
        this._setNavigationParams();
    }

    _setNavigationParams() {
        let headerTitle       = <View style={{flex: -1, width: 1000, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text 
                                        style={{fontFamily: 'Helvetica-Bold', fontSize: 20, fontWeight: '300', color: '#434646'}}>
                                        DASHBOARD
                                    </Text>
                                </View>;
        let headerLeft  = null;
        let headerRight =   <TouchableOpacity
                                onPress={() => {this._showDrawer();}}>
                                <Icon name='md-menu' style={{color: '#EEB843', fontSize: 35}} />
                            </TouchableOpacity>
      
        this.props.navigation.setParams({ 
            headerTitle,
            headerLeft,
            headerRight, 
        });
    }

    _showDrawer = () => {
        this.props.navigation.navigate('DrawerToggle');
    }

    static navigationOptions = ({navigation, screenProps}) => {
        const params = navigation.state.params || {};
        
        return {
            headerTitle: params.headerTitle,
            headerLeft:  params.headerLeft,
            headerRight: params.headerRight,
        }
    }
 */

    static navigationOptions = {
        headerTitle : 
            <Header2
                title= 'DASHBOARD'
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    /* static navigationOptions = {
        headerTitle : 
            <View style={{flex: -1, width: 1000, justifyContent: 'center', alignItems: 'center'}}>
                <Text 
                    style={{fontFamily: 'Helvetica-Bold', fontSize: 20, fontWeight: '300', color: '#434646'}}>
                    DASHBOARD
                </Text>
            </View>,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    } */

    testFunc = () => {
        let params = this.props.navigation.state;
/*         console.log('params.username: ' + params.username); */
        Object.keys(params).map(key => {
            console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
            console.log('KEY: ' + key);
            console.log('VALUE: ' + params[key]);
            console.log('KEY-TYPE: ' + typeof(key));
            console.log('VALUE-TYPE: ' + typeof(params[key]));
            let objParams = params[key];
            if(typeof(objParams) === 'object'){
                console.log('---------------------------------------------------------');
                Object.keys(objParams).map(subKey => {
                    console.log('KEY: ' + subKey);
                    console.log('VALUE: ' + params[subKey]);
                    console.log('KEY-TYPE: ' + typeof(subKey));
                    console.log('VALUE-TYPE: ' + typeof(params[subKey]));
                    
                });
            }
        });
    }

    _showDrawer = () => {
        let {params} = this.props.navigation.state;
        this.props.navigation.navigate('DrawerToggle', {
            username: params.username
        });
    }

    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>This will display Employer Dash Board</Text>
                <Button title="SHOWDRAWER" onPress={() => this._showDrawer()}/>
                {this.testFunc()}
            </View>
        );
    }
}