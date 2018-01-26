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
import * as employeeActions from '../data/actions';

//constants
//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Basic and Contact Information'
export class BasicInfo extends Component {
    render(){
        const navigation = this.props.logininfo.navigation;
        return(
            <View style={styles.container}>
                <View style={styles.contCard}>
                    <CustomCard title={TITLE} oType='Text'>

                            <View style={{marginTop: -20}}>
                                <PropTitle name='Basic Information'/>

                                <PropLevel2 
                                    name={'First Name'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            Jose
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 40}}
                                    hideBorder={true}
                                />

                                <PropLevel2 
                                    name={'Middle Name'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            Protacio
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 40}}
                                    hideBorder={true}
                                />

                                <PropLevel2 
                                    name={'Last Name'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            Asin
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 40}}
                                    hideBorder={true}
                                />

                                <PropLevel2 
                                    name={'Nick Name'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            Jose
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 40}}
                                    hideBorder={true}
                                />

                                <PropLevel2 
                                    name={'Date of Birth'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            January 15, 2017
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 40}}
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
                                    placeHolderStyle={{width: 500, height: 40}}
                                    hideBorder={true}
                                />
                                <PropLevel2 
                                    name={'Gender'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            Male
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 40}}
                                    hideBorder={true}
                                />
                                <PropLevel2
                                    name={'Civil Status'}
                                    content={
                                        <Text style={styles.txtDefault}>
                                            Divorced
                                        </Text>
                                    }
                                    contentStyle={{width: 500}}
                                    placeHolderStyle={{width: 500, height: 40}}
                                    hideBorder={true}
                                />
                            </View>

                    </CustomCard>
                </View>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo
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
)(BasicInfo)