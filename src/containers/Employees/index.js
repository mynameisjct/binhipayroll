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
import Header2 from '../Headers/header2';
import * as StatusLoader from '../../components/ScreenLoadStatus'

//Children Components
import Summary from './summary';

//Helper
import * as oHelper from '../../helper';

//Redux
import { connect } from 'react-redux';

//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';

export class Employees extends Component {
        //List of Children
    constructor(props){
        super(props);
        this.state = {
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

    static navigationOptions = {
        header : 
            <Header2 title= 'MY EMPLOYEES'/>
    }

    render(){
        const oListHeader = (
            <View style={styles.contSearch}>
                <View style={styles.iconFilter}>
                    <Icon name='filter' size={20} color='#fff' />
                </View>
                
                <View style={styles.contSearchBox}>
                    <Icon name='magnify' size={22} color='#000' style={styles.iconSearch}/>
                    <TextInput 
                        style={styles.textinputField}
                        placeholder='Search'
                        onChangeText={txtInput => {}}
                        value={''}
                        ref='_ref_emp_search'
                        returnKeyType="search"
                        underlineColorAndroid='transparent'
                    />
                </View>
            </View>
        )
        return(
            <View style={styles.container}>
                <LinearGradient 
                    colors={['#818489', '#3f4144', '#202626']}
                    style={styles.leftCont}>
                    
                    <LinearGradient 
                        colors={['#818489', '#3f4144', '#202626']}
                        style={styles.contTitle}>

                        <Text style={styles.txtTitle}>
                            {this.props.activecompany.name.toUpperCase()}
                        </Text>

                    </LinearGradient>

                    <View style={styles.optionsCont}>
                        <FlatList
                            /* getItemLayout={this._getItemLayout} */
                            ListHeaderComponent={oListHeader}
                            ref={(ref) => { this.flatListRef = ref; }}
                            data={this.state._list}
                            renderItem={({item}) => 
                                <TouchableNativeFeedback 
                                    onPress={() => {/* this._setActiveChild(item) */}}
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
                    </View>
                </LinearGradient>
                    
                <View style={styles.rightCont}>
                    <Summary/>
                </View>
            </View>
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
)(Employees)