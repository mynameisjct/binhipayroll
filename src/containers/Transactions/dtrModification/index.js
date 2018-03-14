import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header2 from '../../Headers/header2';

//Styles
import styles from '../styles';

//Children Components
import EmployeeDTR from '../../DTR';
import EmployeeList from '../../Employees/list';

//Custom Components
import GenericContainer from '../../../components/GenericContainer';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeListActions from '../../Employees/data/list/actions';

//Constants
const TITLE = 'Loading Employee List';

export class DTRModification extends Component {
    constructor(props){
        super(props);
        this.state={
            _summaryStatus: [2, 'Loading...'],
            _bHasMounted: false
        }
    }

    static navigationOptions = {
        headerTitle : 
            <Header2
                title= 'DTR MODIFICATION'
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    componentDidMount = () => {
        if(this.props.employeelist.status[0] != 1){
            this._getEmployeeListFromDB();
        }
        this.setState({ _bHasMounted: true });
    }

    _getEmployeeListFromDB = () => {
        this.props.actions.employeelist.get();
    }
    
    setActiveProfileStatus = (status) => {
        this.setState({ _summaryStatus: status });
    }

    render(){
        console.log('_summaryStatus: ' + this.state._summaryStatus);
        console.log('ENTERED LEAVE APPLICATION COMPONENT!');
        return(
            this.state._bHasMounted ?
                <GenericContainer 
                    containerStyle={styles.containerFlexRow}
                    status={this.props.employeelist.status}
                    title={TITLE}
                    onRefresh={this._getEmployeeListFromDB}>

                    <EmployeeList 
                        activeProfileStatus={this._setActiveProfileStatus}
                        viewOnly={true}/>
                    <EmployeeDTR status={this.state._summaryStatus}/>

                </GenericContainer>
            :
                <View style={styles.containerFlexRow}></View>
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
)(DTRModification)