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
import styles from './styles';

//Custom Components
import * as StatusLoader from '../../../components/ScreenLoadStatus'
import CustomCard, 
{
    Description,
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';

//Helper
import * as oHelper from '../../../helper';

//Redux
import { connect } from 'react-redux';

//constants
//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Employee Profile Summary'
export class Summary extends Component {
    render(){
        const navigation = this.props.logininfo.navigation;
        return(
            <View style={styles.rightCont}>
                <View style={styles.contCard}>
                    <CustomCard title={TITLE} oType='Text'>

                            <View style={{marginTop: -30}}>
                                <PropTitle name='Personal Information'/>

                                <PropLevel2 
                                    name={'Name'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            Asin, Jose Proctacio
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 30}}
                                    hideBorder={true}
                                />

                                <PropLevel2 
                                    name={'Age'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            25
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 30}}
                                    hideBorder={true}
                                />

                                <PropLevel2 
                                    name={'Birthday'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            January 1, 1993
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 30}}
                                    hideBorder={true}
                                />

                                <PropTitle name='Employment Information'/>

                                <PropLevel2 
                                    name={'ID Code'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            00132
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 30}}
                                    hideBorder={true}
                                />

                                <PropLevel2 
                                    name={'Employment Status'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            Regular
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 30}}
                                    hideBorder={true}
                                />

                                <PropLevel2 
                                    name={'Date Hired'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            January 15, 2017
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 30}}
                                    hideBorder={true}
                                />
                                <PropLevel2 
                                    name={'Position'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            Auditor
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 30}}
                                    hideBorder={true}
                                />
                                <PropLevel2 
                                    name={'Branch'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            Yacapin Branch
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 30}}
                                    hideBorder={true}
                                />
                            </View>

                    </CustomCard>
                </View>
                <TouchableNativeFeedback 
                    onPress={() => {navigation.navigate('EmployeeProfile')}}
                    background={TouchableNativeFeedback.SelectableBackground()}>

                    <View style={styles.contFooter}>
                        <Text style={styles.txtLabel}>View Complete Profile</Text>
                    </View>

                </TouchableNativeFeedback>

            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        employee: state.employeeProfile.employee
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
)(Summary)