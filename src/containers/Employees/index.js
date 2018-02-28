//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

//Children Components
import List from './list';

//Styles Properties
import styles from './styles';

//Custom Components
import Header2 from '../Headers/header2';
import * as PromptScreen from '../../components/ScreenLoadStatus';

//Children Components
import Summary from './summary';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeListActions from './data/list/actions';

const TITLE = 'EMPLOYEE LIST'
export class Employees extends Component {
    constructor(props){
        super(props);
        this.state={
            _status: [2, 'Loading...']
        }
    }

    static navigationOptions = {
        header : 
            <Header2 title= 'MY EMPLOYEES'/>
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps.employeelist.status: ' + nextProps.employeelist.status);
        if(this.state._status[0] != nextProps.employeelist.status[0]){
            this.setState({ _status: nextProps.employeelist.status })
        }
    }

    componentDidMount = () => {
        this._getEmployeeListFromDB();
    }

    _getEmployeeListFromDB = () => {
        this.props.actions.employeelist.get();
    }

    render(){
        console.log('this.state._status: ' + this.state._status)
        let pStatus = [...this.state._status]
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];
        if(pProgress==0){
            return (
                <PromptScreen.PromptError title={TITLE} onRefresh={this._getEmployeeListFromDB}/>
            );
        }

        else if(pProgress==1){
            return(
                <View style={styles.container}>
                    <List/>
                    <Summary/>
                </View>
            )
        }

        else{
            return (
                <View style={styles.container}>
                    <PromptScreen.PromptLoading title={pMessage}/>
                </View>
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        employeelist: state.employees.list
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employeelist: bindActionCreators(employeeListActions, dispatch)
        },
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Employees)
