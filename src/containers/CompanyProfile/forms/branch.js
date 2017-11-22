import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header3 from '../../Headers/header3';
import styles from '../forms/styles';

export default class BranchForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            _branchName: '',
            _address: '',
            _contact: [],
            _emailAddress: ''
        }
    }

    static navigationOptions = {
        header:
            <Header3
                title= 'NEW BRANCH'
            />
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.formCont}>
                        <View style={[styles.nameCont, styles.defaultProp]}>
                            <Text style={styles.txtLabel}>BRANCH NAME</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {
                                    this.setState({_branchName: inputTxt});
                                    }
                                }
                                value={this.state._branchName}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="done"
                            />
                        </View>
                        <View style={[styles.addressCont, styles.defaultProp]}>
                            <Text style={styles.txtLabel}>ADDRESS</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {
                                    this.setState({_address: inputTxt});
                                    }
                                }
                                value={this.state._address}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="done"
                            />
                        </View>
                        <View style={[styles.contactCont]}>
                            <Text style={styles.txtLabel}>CONTACT NUMBERS</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {
                                    this.setState({_contact: inputTxt});
                                    }
                                }
                                value={this.state._newPassword}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="done"
                            />
                            <TouchableNativeFeedback
                                onPress={() => {}}
                                background={TouchableNativeFeedback.SelectableBackground()}>
                                <Text style={styles.txtBtnLabel}>Add New</Text>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={[styles.emailAddressCont, styles.defaultProp]}>
                            <Text style={styles.txtLabel}>EMAIL ADDRESS</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {
                                    this.setState({_emailAddress: inputTxt});
                                    }
                                }
                                value={this.state._emailAddress}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="done"
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}