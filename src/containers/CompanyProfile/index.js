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
import ActionButton from 'react-native-action-button';

//Redux
import { connect } from 'react-redux';
import {
    SetLoginInfo, 
    SetActiveCompany
} from '../../actions';

export class CompanyProfile extends Component {
    static navigationOptions = {
        header : 
            <Header2
                title= 'COMPANY PROFILE'
            />
    }

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
                },

                {
                    name: 'Branch3',
                    address: 'Moon Street, CDOC',
                    contact: ['231-5000', '09156845320'],
                    email: 'iamgorilla@gmail.com'
                },

                {
                    name: 'Branch4',
                    address: 'Sun Street, CDOC',
                    contact: ['231-5000', '09156845320'],
                    email: 'iamgorilla@gmail.com'
                }
                
            ],

            _owners: [
                {
                    name: 'Andres Bonifacio',
                    contact: ['09193658545', '09195684225'],
                    email: 'callmeandressbon@gmail.com'
                },

                {
                    name: 'Jose Protacio Rizal',
                    contact: ['090562854633'],
                    email: 'iamjoserizal@gmail.com'
                }
            ],

            _companyId: [
                {
                    name: 'SSS',
                    number: '12345'
                },

                {
                    name: 'PAGIBIG',
                    number: '6789'
                },
                
                {
                    name: 'PHILHEALTH',
                    number: '101112'
                },

                {
                    name: 'TIN',
                    number: '131415'
                },
            ],

            _mainAddress: 'Sample Address, Cagayan de Oro City'
        }
    }

    _onPressButton = () =>{
        alert('Button is pressed');
    }

    _setTopBorder = (index) => {
        if (index>0){
            return(
                {
                    backgroundColor: '#D1D4D6',
                    height: 1,
                }
            )
        }

        else{
            return(
                {
                    height: 0,
                }
            )
        }
    }

    _displayAddress = (curEntityType, entity) => {
        if (curEntityType == 'BRANCH' && entity.address){
            return(
                <Text style={styles.txtInfoDetails}>
                    {entity.address}
                </Text>
            )
        }
    }
    
    _displayContact = (curEntityType, entity) => {
        if ((curEntityType == 'BRANCH' || curEntityType == 'OWNER') && entity.contact){
            return(
                entity.contact.map((number, index) =>
                    <Text key={index} style={styles.txtInfoDetails}>
                        {number}
                    </Text>   
                )
            )
        }
    }

    _displayEmail = (curEntityType, entity) => {
        if ((curEntityType == 'BRANCH' || curEntityType == 'OWNER') && entity.email){
            return(
                <Text style={styles.txtInfoDetails}>
                    {entity.email}
                </Text>
            )
        }
    }

    _displayId = (curEntityType, entity) => {
        if (curEntityType == 'COMPANYID' && entity.number){
            return(
                <Text style={styles.txtInfoDetails}>
                    {entity.number}
                </Text>
            )
        }
    }

    _listCards = (curEntityType) => {
        let strEntityType = curEntityType.toUpperCase();
        let oEntity = '';
        let strIcon = '';
        let strTitle = '';
        if (strEntityType == 'BRANCH'){
            oEntity = this.state._branches;
            strIcon = 'md-home',
            strTitle = 'BRANCHES'
        }
        else if (strEntityType == 'OWNER'){
            oEntity = this.state._owners;
            strIcon = 'md-person',
            strTitle = 'OWNERS'
        }
        else if (strEntityType == 'COMPANYID'){
            oEntity = this.state._companyId;
            strIcon = 'ios-card',
            strTitle = 'COMPANY ID'
        }
        else;

        return(
            <View style={styles.branchesCont}>
                <View style={[styles.branchForm, styles.defaultContMargin]}>
                    <View style={styles.cardHeaderCont}>
                        <View style={styles.cardTitle}>
                            <Text style={styles.txtHeader}>
                                BRANCHES
                            </Text>
                        </View>
                    </View>
                    {
                        oEntity.map((entity, index) => (
                            <TouchableNativeFeedback
                                key={index}
                                onPress={() => {this._navigateToForm(strEntityType, entity)}}
                                background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={[styles.branchList]}>
                                    <View style={styles.iconCont}>
                                        <Icon size={50} name={strIcon} color='#838383' />
                                    </View>
                                    <View style={[styles.branchInfoCont]}>
                                        <View style={[styles.borderGap, this._setTopBorder(index)]}>
                                        </View>
                                        <View style={styles.branchInfoCard}>
                                            <Text style={styles.txtInfoTitle}>
                                                {entity.name}
                                            </Text>
                                            {this._displayAddress(strEntityType,entity)}
                                            {this._displayContact(strEntityType, entity)}
                                            {this._displayEmail(strEntityType, entity)}
                                            {this._displayId(strEntityType, entity)}
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        ))
                    }
                    <View style={styles.fixedGap}>
                    </View>
                </View>
            </View>
        )
    }

    _navigateOnClick = (curActionType) => {
        let strActionType = curActionType.toUpperCase();
        if (strActionType == 'NEW_BRANCH'){
            
        }
        else{
            alert('Button is pressed. Navigation Address to be identified.');
        }
    }

    _navigateToForm = (curActionType, oInfo) => {
        switch(curActionType){
            case 'BRANCH':
                this.props.navigation.navigate('BranchForm');
                break;
            case 'COMPANYID':
                this.props.navigation.navigate('CompanyIdForm', {
                    info: oInfo
                });
                break;
            default:
                alert('UNHANDLED CASE. CHECK CODE');
                break;
        }
    }

    CompanyIdForm
    render(){
        let objActiveCompany = Object.assign({}, this.props.activecompany);
        return(
            <View style={styles.container}>
                <ScrollView>
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
                    
                    {this._listCards('BRANCH')}
                    {this._listCards('OWNER')}
                    {this._listCards('COMPANYID')}

                    <View style={styles.bottomGap}>
                    </View>
                </ScrollView>

                <ActionButton offsetX={40} buttonColor="rgba(1, 111, 0, 0.8)">
                    <ActionButton.Item buttonColor='#EEB843' title="Add New Branch" onPress={() => {this._navigateToForm('BRANCH')}}>
                        <Icon name="md-home" color='#fff' size={30} style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                
            </View>
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