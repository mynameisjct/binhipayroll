//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from '../styles';

//Children Components
import EmployeeDependents from '../../addEmployeeForm/personalinfo/dependents';

//Custom Components
import * as StatusLoader from '../../../../components/ScreenLoadStatus'
import CustomCard from '../../../../components/CustomCards';
import FixedCard1 from '../../../../components/FixedCards';
import FormModal from '../../../../components/FormModal';

//Helper
import * as oHelper from '../../../../helper';

//Redux
import { connect } from 'react-redux';
import * as employeeActions from '../../data/activeProfile/actions';
import { bindActionCreators } from 'redux';

//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Family and Dependents'

export class EmpFamily extends Component {
    constructor(props){
        super(props);
        this.state = {
            _bShowForm: false,
            _bTriggerSave: false
        }
    }

    _editData = () => {
        this.setState({ _bShowForm: true });
    }

    _onCancel = () => {
        this.setState({ _bShowForm: false });
    }

    _onSubmit = () => {
        Alert.alert(
            'Warning',
            'All changes will be saved and will be irreversible. Are you sure you want to proceed ?',
            [
                {text: 'NO', onPress: () =>  this.setState({ _bTriggerSave: false })},
                {text: 'YES', onPress: () => this.setState({ _bTriggerSave: true })}
            ],
            { cancelable: false }
        )
        //this.setState({ _bShowForm: false });
    }

    _generateDependents = (oDependents) => {
        let arrDependents = [];
        oDependents.data.map((oData, index) => 
            arrDependents.push({
                label: "DEPENDENT " + (index+1),
                value: [
                    oData.name, 
                    (oHelper.isValidDate(oData.birthdate.value) ?
                    oHelper.convertDateToString(
                        oData.birthdate.value,
                        oData.birthdate.format
                    ) : oData.birthdate.value),
                    oData.relationship],
                hasTitle: true
            })
        )
        console.log('arrDependents: ' + JSON.stringify(arrDependents));
        return arrDependents;
    }

    render(){
        console.log('oDependents: ' + JSON.stringify(this.props.employees.activeProfile.data.personalinfo.family.dependents))
        const oSpouse = this.props.employees.activeProfile.data.personalinfo.family.spouse;
        const oDependents =  this.props.employees.activeProfile.data.personalinfo.family.dependents;
        const navigation = this.props.logininfo.navigation;
        let attribs_dependents = this._generateDependents(this.props.employees.activeProfile.data.personalinfo.family.dependents);
        const attribs_spouse = 
            [
                {
                    label: 'NAME',
                    value: oSpouse.name || ''
                },
                {
                    label: 'BIRTHDATE',
                    value: (oHelper.isValidDate(oSpouse.birthdate.value) ?
                    oHelper.convertDateToString(
                        oSpouse.birthdate.value,
                        oSpouse.birthdate.format
                    ) : oSpouse.birthdate.value)
                },
                {
                    label: 'WORK',
                    value: [oSpouse.work.jobtitle || '', oSpouse.work.company || ''],
                    hasTitle: true
                }
            ]

        
        console.log ('attribs_dependents: ' + JSON.stringify(attribs_dependents));
        return(
            <View style={styles.child.container}>
                <View style={styles.child.contCard}>
                    <CustomCard 
                        clearMargin={true} 
                        title={TITLE} 
                        oType='Button'
                        rightHeader={
                            <TouchableOpacity
                                style={styles.child.contBtn}
                                onPress={this._editData}>
                                <Icon name='ios-create-outline' size={40} color='#000000'/>
                            </TouchableOpacity>
                        }>
                        <ScrollView>
                            <View style={styles.child.contContent}>

                                <FixedCard1
                                    hideActionIcon={true}
                                    title={oSpouse.title || 'SPOUSE'}
                                    attributes={attribs_spouse}/>
                                
                                <FixedCard1
                                    hideActionIcon={true}
                                    title={oDependents.title || 'DEPENDENTS'}
                                    attributes={attribs_dependents}/>

                            </View>
                        </ScrollView>
                        
                    </CustomCard>
                </View>

                <FormModal 
                    containerStyle={styles.formModal.container}
                    visible={this.state._bShowForm}
                    onCancel={this._onCancel}
                    onOK={this._onSubmit}
                    title="MODIFY FAMILY AND DEPENDENTS INFORMATION">
                    <EmployeeDependents formTriggerSave={this.state._bTriggerSave} hideForm={this._hideForm}/>
                </FormModal>

            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        employees: state.employees
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpFamily)