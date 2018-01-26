//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from './styles';

//Custom Components
import Header2 from '../../Headers/header2';
import * as StatusLoader from '../../../components/ScreenLoadStatus'
import SearchBox from '../../../components/SearchBox';
import ActionButton from '../../../components/ActionButton';
import * as PromptScreen from '../../../components/ScreenLoadStatus';

//Redux
import { connect } from 'react-redux';

//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';

export class List extends Component {
        //List of Children
    constructor(props){
        super(props);
        this.state = {
            _promptShow: false,
            _promptMsg: '',
            _refreshing: false,
            _list: [
                {
                    key: "0001",
                    name: "Asin, Jose Protacio",
                    position: "Auditor",
                    branch: "Yacapin branch"
                },
                {
                    key: "0002",
                    name: "Asinero, Lourdes",
                    position: "Utility",
                    branch: "Yacapin branch"
                },
                {
                    key: "0003",
                    name: "Bagares, Lyn",
                    position: "Utility",
                    branch: "Yacapin branch"
                },
                {
                    key: "0004",
                    name: "Rizal, Delilah",
                    position: "HR Staff",
                    branch: "Yacapin branch"
                },
                {
                    key: "0005",
                    name: "Zamora, Israel",
                    position: "HR Staff",
                    branch: "Yacapin branch"
                }
            ]
        }
    }

    _doNothing = () => {

    }

    _addNewEmployee = () => {
        this._showLoadingPrompt('Loading required forms. Please wait...');
        requestAnimationFrame(() => {
            this._hideLoadingPrompt();
            this.props.logininfo.navigation.navigate('AddEmployeeForm');
            
        })
    }

    _hideLoadingPrompt = () => {
        this.setState({
            _promptShow: false
        })
    }

    _showLoadingPrompt = (msg) => {
        this.setState({
            _promptMsg: msg,
            _promptShow: true
        })
    }
    
    render(){
        const oListHeader = (
            <View style={styles.contSearch}>
                <View style={styles.iconFilter}>
                    <Icon name='filter' size={20} color='#fff' />
                </View>
                
                <SearchBox value={'TEST'} 
                    onChangeText={this._doNothing} 
                    onSubmit={this._doNothing}/>

            </View>
        )
        return(
            <LinearGradient 
                colors={['#818489', '#3f4144', '#202626']}
                style={styles.leftCont}>
                
                <LinearGradient 
                    colors={['#818489', '#3f4144', '#202626']}
                    style={styles.contTitle}>

                    
                    <View style={styles.contTitleName}>
                        <Text style={styles.txtTitle}>
                            {this.props.activecompany.name.toUpperCase()}
                        </Text>
                    </View>
                </LinearGradient>

                <View style={styles.optionsCont}>
                    <FlatList
                        /* getItemLayout={this._getItemLayout} */
                        refreshing={this.state._refreshing}
                        onRefresh={() => {
                            this.setState({_refreshing: true},
                            () => {
                                setTimeout(() => {
                                    this.setState({_refreshing: false});
                                }, 5000);
                            }
                            
                        )
                        }}
                        ListHeaderComponent={oListHeader}
                        ref={(ref) => { this.flatListRef = ref; }}
                        data={this.state._list}
                        renderItem={({item}) => 
                            <TouchableNativeFeedback 
                                onPress={() => {/* this._setActiveChild(item) */}}
                                onLongPress={() => {
                                    alert('ALERT TEST!')
                                }}
                                background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={[styles.btnCont]}>
                                    <View style={styles.iconCont}>
                                        <View style={styles.iconPlaceholder}>
                                            <Text style={styles.txtFirstLetter}>{item.name.charAt(0)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.labelCont}>
                                        <Text style={styles.txtLabelTitle}>{item.name}</Text>
                                        <Text style={styles.txtLabel}>{item.position}</Text>
                                        <Text style={styles.txtLabel}>{item.branch}</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        }
                    />
                    <ActionButton onPress={this._addNewEmployee}/>
                </View>
                
                <PromptScreen.PromptGeneric 
                    show= {this.state._promptShow} 
                    title={this.state._promptMsg}/>

            </LinearGradient>
        )
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany
    }
}

function mapDispatchToProps (dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)