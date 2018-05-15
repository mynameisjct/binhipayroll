import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header2 from '../Headers/header2';

//Children Components
import TransactionsList from './list';
import GenericContainer from '../../components/GenericContainer';

//Constants
const TITLE = 'TRANSACTIONS';

export default class Transactions extends Component {
    constructor(props){
        super(props);
        this.state={
            _summaryStatus: [2, 'Loading...'],
            _status: false
        }
    }

    static navigationOptions = {
        headerTitle : 
            <Header2
                title= 'TRANSACTIONS'
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    componentDidMount = () => {
        setTimeout( () => {
            this.setState({ _status: [1, 'Component Mounted.']});
        },100);
    }

    render(){
        
        return(
            <GenericContainer 
                status={this.state._status}
                title={TITLE}
            >
                <TransactionsList/>
            </GenericContainer>
            
        );
    }
}