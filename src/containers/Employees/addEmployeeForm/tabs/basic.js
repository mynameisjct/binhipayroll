import React, { Component } from 'react';
import {
    View,
    TextInput,
    ScrollView,
    Text,
    Button
} from 'react-native';

//Styles Properties
import styles from './styles';

import {FormCard, PropTitle} from '../../../../components/CustomCards';

export default class Basic extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:''
        }
    }

    _onSubmit = () => {
        console.log('HELLO!');
    }
    
    render(){
        return(
            <View style={{ flex: 1}}>
                
                <ScrollView>
                    
                    {/* <FormCard errorMessage='TEST' onSubmit={this._onSubmit} btnLabel='Next'> */}
                    
                        <View style={styles.formCont}>
                            <View style={{paddingBottom: 10, marginLeft: -15}}><PropTitle name='BASIC INFORMATION'/></View>
                            <View style={styles.fieldCont}>
                                <Text style={styles.txtNameLabel}>FIRST NAME</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                    value={''}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                />
                                
                                <Text style={styles.txtNameLabel}>MIDDLE NAME</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                    value={''}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                />

                                <Text style={styles.txtNameLabel}>LAST NAME</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                    value={''}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                />

                                <Text style={styles.txtNameLabel}>NICK NAME</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                    value={''}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                />

                                <Text style={styles.txtNameLabel}>DATE OF BIRTH</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                    value={''}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                />

                                <Text style={styles.txtNameLabel}>GENDER</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                    value={''}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                />

                                <Text style={styles.txtNameLabel}>CIVIL STATUS</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                    value={''}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                />

                            </View>
                        </View>

                        <View style={styles.formCont}>
                            <View style={{paddingBottom: 10, marginLeft: -15}}><PropTitle name='CONTACT INFORMATION'/></View>
                            <Text style={styles.txtNameLabel}>MOBILE NO</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                value={''}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="next"
                                autoCorrect={false}
                                autoCapitalize='none'
                            />

                            <Text style={styles.txtNameLabel}>TELEPHONE NO</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                value={''}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="next"
                                autoCorrect={false}
                                autoCapitalize='none'
                            />

                            <Text style={styles.txtNameLabel}>EMAIL ADDRESS</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                value={''}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="next"
                                autoCorrect={false}
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={styles.formCont}>
                            <View style={{paddingBottom: 10, marginLeft: -15}}><PropTitle name='GOVERNMENT IDS'/></View>
                            <Text style={styles.txtNameLabel}>TIN</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                value={''}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="next"
                                autoCorrect={false}
                                autoCapitalize='none'
                            />

                            <Text style={styles.txtNameLabel}>SSS</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                value={''}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="next"
                                autoCorrect={false}
                                autoCapitalize='none'
                            />

                            <Text style={styles.txtNameLabel}>PHILHEALTH</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                value={''}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="next"
                                autoCorrect={false}
                                autoCapitalize='none'
                            />

                            <Text style={styles.txtNameLabel}>PAGIBIG</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {/* this._updateName(inputTxt) */}}
                                value={''}
                                underlineColorAndroid='#D1D4D6'
                                returnKeyType="next"
                                autoCorrect={false}
                                autoCapitalize='none'
                            />

                            <View style={{flex:1, paddingBottom: 30, paddingTop: 30}}>
                                <Button
                                    onPress={() => {}}
                                    title='Next'
                                    color="#3b5998"
                                    accessibilityLabel='Next'
                                />
                            </View>
                        </View>
                    {/* </FormCard> */}
                </ScrollView>
            </View>
        )
    }
}