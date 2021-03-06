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
import EmployeeList from './list';

//Styles Properties
import styles from './styles';

//Custom Components
import Header2 from '../Headers/header2';
import * as PromptScreen from '../../components/ScreenLoadStatus';
import GenericContainer from '../../components/GenericContainer';

//Children Components
import Summary from './summary';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeListActions from './data/list/actions';
import { CONSTANTS } from '../../constants/index';

const TITLE = 'Loading Employee List'
export class Employees extends Component {
    constructor(props){
        super(props);
        this.state={
            _summaryStatus: [2, 'Loading...'],
            _bDidMount: false
        }
    }

    static navigationOptions = {
        header : 
            <Header2 title= 'MY EMPLOYEES'/>
    }

    componentDidMount = () => {
        if(this.props.employeelist.status[0] != 1){
            this._getEmployeeListFromDB();
            this.setState({_bDidMount: true});
        }
        else{
            setTimeout( () => {
                this.setState({_bDidMount: true});
            },100);
        }
    }

    _getEmployeeListFromDB = () => {
        this.props.actions.employeelist.get();
    }

    _setActiveProfileStatus = (status) => {
        this.setState({ _summaryStatus: status });
    }

    render(){
        console.log('Rendering My Employees: ' + this.props.employeelist.status);
        return(
            <GenericContainer 
                status={this.state._bDidMount ? this.props.employeelist.status : CONSTANTS.STATUS.LOADING}
                title={TITLE}
                onRefresh={this._getEmployeeListFromDB}>
                <View style={styles.container}>
                    <EmployeeList activeProfileStatus={this._setActiveProfileStatus}/>
                    <Summary status={this.state._summaryStatus}/>
                </View>

            </GenericContainer>
        );
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
