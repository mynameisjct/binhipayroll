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

export default class CompanyIdForm extends Component {
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
                title= 'MODIFY SSS ID'
            />
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.formCont}>
                        <View style={[styles.nameCont, styles.defaultProp]}>
                            <Text style={styles.txtLabel}>SSS ID</Text>
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
                    </View>
                </ScrollView>
            </View>
        );
    }
}