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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from '../styles';

//Custom Components
import * as StatusLoader from '../../../../components/ScreenLoadStatus'
import CustomCard, 
{
    Description,
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../../components/CustomCards';

//Helper
import * as oHelper from '../../../../helper';

//Redux
import { connect } from 'react-redux';
import * as employeeActions from '../../data/activeProfile/actions';
import { bindActionCreators } from 'redux';

//Children Components
import Bonus from '../../../CompanyPolicies/bonus';

//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = '13th Month Pay Information'
export default class EmpBonus extends Component {
    render(){
        return(
            <View style={styles.child.container}>
                <Bonus title='EMPLOYEE BONUS' viewOnly={true}/>
            </View>
        );
    }
}
