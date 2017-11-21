import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView,
    Image,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header2 from '../Headers/header2';
import styles from './styles';

//Redux
import { connect } from 'react-redux';
import {
    SetLoginInfo, 
    SetActiveCompany
} from '../../actions';

export class CompanyProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            _branches: [
                {
                    name: 'Branch1',
                    address: 'Yacapin Street, CDOC',
                    contact: ['857-9000', '09179001137'],
                    email: 'iammonkey@gmail.com'
                },

                {
                    name: 'Branch2',
                    address: 'Divisoria Street, CDOC',
                    contact: ['231-5000', '09156845320'],
                    email: 'iamgorilla@gmail.com'
                }
            ],

            _mainAddress: 'Sample Address, Cagayan de Oro City'

        }
    }

    static navigationOptions = {
        headerTitle : 
            <Header2
                title= 'COMPANY PROFILE'
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    _onPressButton = () =>{
        alert('Button is pressed');
    }

    render(){
        let objActiveCompany = Object.assign({}, this.props.activecompany);
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.titleCont}>
                        <View style={styles.imagePlaceholder}>
                            <Image 
                                style={styles.imgLogo}
                                resizeMode='cover'
                                source={require('../../assets/img/storelogo.png')}
                            />
                        </View>

                        <View style={[styles.titleContentCont, styles.defaultContMargin]}>
                            <Text style={styles.txtCompanyName}>{objActiveCompany.name ? objActiveCompany.name.toUpperCase() : objActiveCompany.name}</Text>
                            <Text style={styles.txtCompanyAddress}>{this.state._mainAddress}</Text>
                        </View>
                    </View>
                    <View style={styles.branchesCont}>
                        <View style={[styles.branchForm, styles.defaultContMargin]}>
                            <View style={styles.cardHeaderCont}>
                                <View style={styles.cardTitle}>
                                    <Text style={styles.txtHeader}>
                                        BRANCHES
                                    </Text>
                                </View>
                                <View style={styles.cardAddBtn}>
                                    <TouchableNativeFeedback
                                        onPress={() => {this._onPressButton('company')}}
                                        background={TouchableNativeFeedback.SelectableBackground()}>
                                        <Icon size={40} name='md-add-circle' color='#2C5C36' />
                                    </TouchableNativeFeedback>
                                </View>
                            </View>
                            
                            <TouchableNativeFeedback
                                onPress={() => {this._onPressButton('company')}}
                                background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={styles.branchList}>
                                    <View style={styles.iconCont}>
                                        <Icon size={50} name='md-home' color='#838383' />
                                    </View>
                                    <View style={styles.branchInfoCont}>
                                        <View style={styles.branchInfoCard}>
                                            <Text style={styles.txtInfoTitle}>
                                                Yacapin Branch
                                            </Text>
                                            <Text style={styles.txtInfoDetails}>
                                                Yacapin Street, Cagayan de Oro City
                                            </Text>
                                            <Text style={styles.txtInfoDetails}>
                                                857-9000
                                            </Text>
                                            <Text style={styles.txtInfoDetails}>
                                                iammonkey@gmail.com
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>

                            <View style={styles.fixedGapContent}>
                            </View>

                            <View style={styles.contentGap}>
                                <View style={styles.iconCont}>
                                </View>
                                <View style={styles.lineFlex}>
                                </View>
                                <View style={styles.lineMargin}>
                                </View>
                            </View>

                            <View style={styles.fixedGapContent}>
                            </View>

                            <TouchableNativeFeedback
                                onPress={() => {this._onPressButton('company')}}
                                background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={styles.branchList}>
                                    <View style={styles.iconCont}>
                                        <Icon size={50} name='md-home' color='#838383' />
                                    </View>
                                    <View style={styles.branchInfoCont}>
                                        <View style={styles.branchInfoCard}>
                                            <Text style={styles.txtInfoTitle}>
                                                Yacapin Branch
                                            </Text>
                                            <Text style={styles.txtInfoDetails}>
                                                Yacapin Street, Cagayan de Oro City
                                            </Text>
                                            <Text style={styles.txtInfoDetails}>
                                                857-9000
                                            </Text>
                                            <Text style={styles.txtInfoDetails}>
                                                iammonkey@gmail.com
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>

                            <View style={styles.fixedGap}>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ownersCont}>
                        <View style={[styles.branchForm, styles.defaultContMargin]}>
                            <View style={styles.cardHeaderCont}>
                                <View style={styles.cardTitle}>
                                    <Text style={styles.txtHeader}>
                                        OWNERS
                                    </Text>
                                </View>
                            </View>

                            <TouchableNativeFeedback
                                onPress={() => {this._onPressButton('company')}}
                                background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={styles.branchList}>
                                    <View style={styles.iconCont}>
                                        <Icon size={50} name='md-person' color='#838383' />
                                    </View>
                                    <View style={styles.branchInfoCont}>
                                        <View style={styles.branchInfoCard}>
                                            <Text style={styles.txtInfoTitle}>
                                                Jose Protacio Rizal
                                            </Text>
                                            <Text style={styles.txtInfoDetails}>
                                                090562854633
                                            </Text>
                                            <Text style={styles.txtInfoDetails}>
                                                iamjoserizal@gmail.com
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>

                            <View style={styles.fixedGapContent}>
                            </View>

                            <View style={styles.contentGap}>
                                <View style={styles.iconCont}>
                                </View>
                                <View style={styles.lineFlex}>
                                </View>
                                <View style={styles.lineMargin}>
                                </View>
                            </View>

                            <View style={styles.fixedGapContent}>
                            </View>

                            <TouchableNativeFeedback
                                onPress={() => {this._onPressButton('company')}}
                                background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={styles.branchList}>
                                    <View style={styles.iconCont}>
                                        <Icon size={50} name='md-person' color='#838383' />
                                    </View>
                                    <View style={styles.branchInfoCont}>
                                        <View style={styles.branchInfoCard}>
                                            <Text style={styles.txtInfoTitle}>
                                                Andres Bonifacio
                                            </Text>
                                            <Text style={styles.txtInfoDetails}>
                                                09193658545
                                            </Text>
                                            <Text style={styles.txtInfoDetails}>
                                                callmeandressbon@gmail.com
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>

                            <View style={styles.fixedGap}>
                            </View>
                        </View>
                    </View>

                    <View style={styles.companyIds}>
                        <View style={[styles.branchForm, styles.defaultContMargin]}>
                                <View style={styles.cardHeaderCont}>
                                    <View style={styles.cardTitle}>
                                        <Text style={styles.txtHeader}>
                                            COMAPANY IDs
                                        </Text>
                                    </View>
                                </View>

                                <TouchableNativeFeedback
                                    onPress={() => {this._onPressButton('company')}}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View style={styles.companyIdList}>
                                        <View style={styles.iconCont}>
                                            <Icon size={50} name='ios-card' color='#838383' />
                                        </View>
                                        <View style={styles.branchInfoCont}>
                                            <View style={styles.branchInfoCard}>
                                                <Text style={styles.txtInfoTitle}>
                                                    SSS
                                                </Text>
                                                <Text style={styles.txtInfoDetails}>
                                                    12345
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableNativeFeedback>

                                <View style={styles.fixedGapContent}>
                                </View>

                                <View style={styles.contentGap}>
                                    <View style={styles.iconCont}>
                                    </View>
                                    <View style={styles.lineFlex}>
                                    </View>
                                    <View style={styles.lineMargin}>
                                    </View>
                                </View>

                                <View style={styles.fixedGapContent}>
                                </View>

                                <TouchableNativeFeedback
                                    onPress={() => {this._onPressButton('company')}}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View style={styles.companyIdList}>
                                        <View style={styles.iconCont}>
                                            <Icon size={50} name='ios-card' color='#838383' />
                                        </View>
                                        <View style={styles.branchInfoCont}>
                                            <View style={styles.branchInfoCard}>
                                                <Text style={styles.txtInfoTitle}>
                                                    PAGIBIG
                                                </Text>
                                                <Text style={styles.txtInfoDetails}>
                                                    678910
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableNativeFeedback>

                                <View style={styles.fixedGapContent}>
                                </View>

                                <View style={styles.contentGap}>
                                    <View style={styles.iconCont}>
                                    </View>
                                    <View style={styles.lineFlex}>
                                    </View>
                                    <View style={styles.lineMargin}>
                                    </View>
                                </View>

                                <View style={styles.fixedGapContent}>
                                </View>

                                <TouchableNativeFeedback
                                    onPress={() => {this._onPressButton('company')}}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View style={styles.companyIdList}>
                                        <View style={styles.iconCont}>
                                            <Icon size={50} name='ios-card' color='#838383' />
                                        </View>
                                        <View style={styles.branchInfoCont}>
                                            <View style={styles.branchInfoCard}>
                                                <Text style={styles.txtInfoTitle}>
                                                    PHILHEALTH
                                                </Text>
                                                <Text style={styles.txtInfoDetails}>
                                                    121314
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableNativeFeedback>

                                <View style={styles.fixedGapContent}>
                                </View>

                                <View style={styles.contentGap}>
                                    <View style={styles.iconCont}>
                                    </View>
                                    <View style={styles.lineFlex}>
                                    </View>
                                    <View style={styles.lineMargin}>
                                    </View>
                                </View>

                                <View style={styles.fixedGapContent}>
                                </View>

                                <TouchableNativeFeedback
                                    onPress={() => {this._onPressButton('company')}}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View style={styles.companyIdList}>
                                        <View style={styles.iconCont}>
                                            <Icon size={50} name='ios-card' color='#838383' />
                                        </View>
                                        <View style={styles.branchInfoCont}>
                                            <View style={styles.branchInfoCard}>
                                                <Text style={styles.txtInfoTitle}>
                                                    TIN
                                                </Text>
                                                <Text style={styles.txtInfoDetails}>
                                                    151617
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableNativeFeedback>
                                
                                <View style={styles.fixedGap}>
                                </View>
                            </View>
                        </View>

                        <View style={styles.fixedGapContent}>
                        </View>
                        <View style={styles.fixedGapContent}>
                        </View>
                        <View style={styles.fixedGapContent}>
                        </View>
                    </View>
                    
            </ScrollView>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany
    }
}

export default connect(
    mapStateToProps,
)(CompanyProfile)