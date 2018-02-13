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
const TITLE = 'Address Information'

export class EmpDetails extends Component {

    _generatePositionHistory = (oDetails) => {
        let arrPosHistory = [];
        oDetails.data.map((oData, index) => 
            arrPosHistory.push({
                label: (oHelper.isValidDate(oData.effectivedate.from.value) ?
                            oHelper.convertDateToString(
                                oData.effectivedate.from.value,
                                oData.effectivedate.from.format
                            ) : oData.effectivedate.from.value) + '  - \n' +
                            (oHelper.isValidDate(oData.effectivedate.to.value) ?
                            oHelper.convertDateToString(
                                oData.effectivedate.to.value,
                                oData.effectivedate.to.format
                            ) : oData.effectivedate.to.value),
                value: [
                    oData.position, 
                    oData.branch,
                    oData.remarks || null
                ],
                hasTitle: true
            })
        )
        console.log('arrPosHistory: ' + JSON.stringify(arrPosHistory));
        return arrPosHistory;
    }

    render(){
        const oDetails =  this.props.employees.activeProfile.data.employmentinfo.details;
        const navigation = this.props.logininfo.navigation;

        const attribs_PositionHistory = this._generatePositionHistory(oDetails)
        const attribs_details = 
            [
                {
                    label: 'EMPLOYMENT STATUS',
                    value: oDetails.employmenttype || ''
                },
                {
                    label: 'DATE HIRED',
                    value: oHelper.convertDateToString(
                        oDetails.datehired.value,
                        oDetails.datehired.format
                    ) || ''
                },
                {
                    label: 'END DATE',
                    value: oDetails.dateend.value !== '-' ? oHelper.convertDateToString(
                        oDetails.dateend.value,
                        oDetails.dateend.format
                    ) : oDetails.dateend.value
                }
            ]

        

        return(
            <View style={styles.child.container}>
                <View style={styles.child.contCard}>
                    <CustomCard clearMargin={true} title={TITLE} oType='Text'>
                        <ScrollView>
                            <View style={styles.child.contContent}>

                                <FixedCard1
                                    title={oDetails.title || 'PRESENT ADDRESS'}
                                    attributes={attribs_details}/>
                                
                                <FixedCard1
                                    title={'POSITION HISTORY'}
                                    attributes={attribs_PositionHistory}/>

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
)(EmpDetails)