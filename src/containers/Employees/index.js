//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from './styles';

//Custom Components
import Header2 from '../Headers/header2';
import * as StatusLoader from '../../components/ScreenLoadStatus'

//Helper
import * as oHelper from '../../helper';

//Redux
import { connect } from 'react-redux';

//constants
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
        return(
            <View style={styles.container}>
                <View 
                    /* colors={['#0c0c0c', '#302e2e', '#0c0c0c']} */
                    style={styles.leftCont}>
                    
                    <View style={styles.optionsCont}>
                        <LinearGradient 
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.contTitle}>
                            <Text style={styles.txtTitle}>
                                {this.props.activecompany.name.toUpperCase()}
                            </Text>
                        </LinearGradient>
                        <FlatList
                            /* getItemLayout={this._getItemLayout} */
                            ref={(ref) => { this.flatListRef = ref; }}
                            data={this.state._list}
                            renderItem={({item}) => 
                                <TouchableNativeFeedback 
                                    onPress={() => {/* this._setActiveChild(item) */}}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View style={[styles.btnCont]}>
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
                </View>
                    
                <View style={[styles.rightCont, {justifyContent: 'center', alignItems: 'center'}]}>
                    <View style={{height: 100,
                        width: 100, 
                        backgroundColor: 'green', 
                        justifyContent: 'center', 
                        alignItems: 'center',

                        /* borderRadius: 10,
                        borderColor: 'transparent',
                        borderWidth: 1, */
                        /* borderRadius: 50,
                        shadowColor: '#000',
                        shadowOpacity: 1,
                        shadowRadius: 6, */
                        borderRadius: 50,
                        elevation: 30
                    }}>
                        <Text>HI!</Text>
                    </View>
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