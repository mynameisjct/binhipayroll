//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from '../styles';

//Custom Components
import * as StatusLoader from '../../../../components/ScreenLoadStatus'
import CustomCard from '../../../../components/CustomCards';
import FixedCard1 from '../../../../components/FixedCards';

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
        const oSpouse = this.props.employees.activeProfile.data.personalinfo.family.spouse;
        const oDependents =  this.props.employees.activeProfile.data.personalinfo.family.dependents;
        const navigation = this.props.logininfo.navigation;
        let attribs_dependents = this._generateDependents(oDependents);
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
                    <CustomCard clearMargin={true} title={TITLE} oType='Text'>
                        <ScrollView>
                            <View style={styles.child.contContent}>

                                <FixedCard1
                                    title={oSpouse.title || 'SPOUSE'}
                                    attributes={attribs_spouse}/>
                                
                                <FixedCard1
                                    title={oDependents.title || 'DEPENDENTS'}
                                    attributes={attribs_dependents}/>

                            </View>
                        </ScrollView>
                        
                    </CustomCard>
                </View>
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