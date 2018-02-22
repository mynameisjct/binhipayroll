import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    TouchableOpacity
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Children Components
import EmployeeWorkshiftForm from './forms/employeeWorkshiftForm';

//Styles
import styles from './styles';
import WorkShift from '../../../CompanyPolicies/workshift';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workshiftActions from '../../../CompanyPolicies/data/workshift/actions';
import * as employeeActions from '../../data/activeProfile/actions';

//Custom Component
import * as PromptScreen from '../../../../components/ScreenLoadStatus';

//Constants
import { CONSTANTS } from '../../../../constants/index';

export class EmployeeWorkShift extends Component {
    constructor(props){
        super(props);
        this.state = {
            language: '',

            //Generic States
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',
            _refreshing: false,
            _status: [2, 'Loading...'],

            _bShowWorkshiftForm: false,
            _oWorkShiftTypeList: {},
            _oActiveData: {},
            _iActiveIndex: null,
            _oDefaultData: {
                id: '0001',
                index: 1,
                workshiftid: {
                    value: '',
                    label: ''
                },
                effectivedate: {
                    from: {
                        value: null,
                        format: "MMM DD, YYYY"
                    },
                    to: {
                        value: null,
                        "format": "MMM DD, YYYY"
                    }
                },
                remarks: ''
            }
        }
    }
    
    componentDidMount(){
        this._getDataFromDB();
    }

    componentWillReceiveProps(nextProps){
        if(
            (nextProps.workshift.status[0] != this.state._status[0])
        ){
            this.setState({ _status: nextProps.workshift.status });
            if(nextProps.workshift.status[0]==1){
                this._initData(nextProps.workshift.status);
            }
        }
    }

    _getDataFromDB = () => {
        this._getWorkshiftTypes();
    }

    _getWorkshiftTypes = () => {
        this.props.actions.workshift.get(this._requiredInputs());;
    }

    //TO BE DEPRECATED WHEN BACKEND API IS CHANGED
    _requiredInputs = () => {
        return({
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            accesstoken: '',
            clientid: '',
            transtype:'get'
        })
    }

    _initData = async(oStatus) => {
        await this._generateOptions();
        this.setState({
            _status: oStatus
        })
    }

    _generateOptions = () => {
        this._generateWorkShifts()
    }

    _generateWorkShifts = () => {
        let arrWSTypes = [...this.props.workshift.data.schedule];
        let oWSList = {};
        arrWSTypes.map((data, index) => {
            oWSList[data.description + CONSTANTS.SPLITSTRING + data.id] = data.description
        })

        this.setState({
            _oWorkShiftTypeList: oWSList
        })
    }

    _addNewWorkShift = () => {
        let oCurData = JSON.parse(JSON.stringify(this.state._oDefaultData));
        this.setState({ 
            _oActiveData: oCurData,
            _bShowWorkshiftForm: true 
        })
    }

    _cancelTransaction = () => {
        this.setState({ _bShowWorkshiftForm: false })
    }

    _submitTransaction = (value) => {
        console.log ('value: ' + JSON.stringify(value));
        this.setState({ _bShowWorkshiftForm: false })
    }

    _requestDelete = () => {

    }
    

    
    render(){
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Workshift Schedule' onRefresh={this._getDataFromDB}/>
            );
        }

        else if(pProgress==1){
            return(
                <View style={styles.transparentContainer}>
                    { 
                        this.props.oEmpWorkShift.data.length === 0 ?
                            <TouchableOpacity 
                                style={styles.emptyDataContainer}
                                activeOpacity={0.8}
                                onPress={this._addNewWorkShift}>
                                    <Text>
                                        No workshift assigned to employee. Tap here to add.
                                    </Text>
                            </TouchableOpacity>
                        :
                        <View style={styles.container}>
                            <View style={styles.workshiftStyles.header.container}>
                                <View style={styles.workshiftStyles.header.contInfo}>
                                    <View style={styles.workshiftStyles.header.contInfoLabel}>
                                        <Text style={styles.workshiftStyles.header.txtInfo}>
                                            Effective Date:
                                        </Text>
                                    </View>
                                    <View style={styles.workshiftStyles.header.contInfoData}>
                                        <View style={styles.workshiftStyles.header.pickerContainer}>
                                            <Picker
                                                style={styles.workshiftStyles.header.namePickerStyle}
                                                selectedValue={this.state.language}
                                                onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                                                <Picker.Item label="Java" value="java" />
                                                <Picker.Item label="JavaScript" value="js" />
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.workshiftStyles.header.contBtn}>
                                </View>
                            </View>
                            <View style={styles.workshiftStyles.body.container}>
                                <View style={styles.workshiftStyles.body.contRule}>
                                    <WorkShift hideHeader={true} viewOnly={true}/>
                                </View>
                            </View>

                            <ActionButton
                                bgColor='rgba(0,0,0,0.8)'
                                shadowStyle={{elevation: 30}}
                                buttonColor="#EEB843"
                                spacing={10}
                                icon={<Icon name="alarm-multiple" color='#fff' size={25} style={styles.actionButtonIcon} />}>
                                <ActionButton.Item size={45} buttonColor='#26A65B' title="ADD NEW EMPLOYEE SCHEDULE" onPress={() => {this._addNewWorkShift()}}>
                                    <Icon name="bell-plus" color='#fff' size={18} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item size={45} buttonColor='#4183D7' title="ADD NEW WORKSHIFT TYPE" onPress={() => {}}>
                                    <Icon name="table-edit" color='#fff' size={18} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item size={45} buttonColor='#26A65B' title="ADD NEW EMPLOYEE SCHEDULE" onPress={() => {this._addNewWorkShift()}}>
                                    <Icon name="bell-plus" color='#fff' size={18} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                        </View>
                    }
                    {
                        this.state._bShowWorkshiftForm ?
                            <EmployeeWorkshiftForm
                                minEffectiveDate={null}
                                onDelete={this._requestDelete}
                                visible={this.state._bShowWorkshiftForm}
                                activeData = {this.state._oActiveData}
                                cancelForm={this._cancelTransaction}
                                submitForm={this._submitTransaction}
                                title= {this.state._iActiveIndex ? 'MODIFY EMPLOYEE WORKSHIFT' : 'ADD NEW EMPLOYEE WORKSHIFT'}
                                workshifttype={this.state._oWorkShiftTypeList}/>
                        :
                            null
                    }

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
        workshift: state.companyPoliciesReducer.workshift,
        oEmpWorkShift: state.employees.activeProfile.data.employmentinfo.workshift,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch),
            workshift: bindActionCreators(workshiftActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeWorkShift)