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

//Children Components
import Tax from '../../../CompanyPolicies/tax';

export default class EmpTax extends Component {
    render(){
        return(
            <View style={styles.child.container}>
                <Tax title='Tax Policy' viewOnly={true}/>
            </View>
        );
    }
}
