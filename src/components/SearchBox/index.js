//Packages
import React, { Component } from 'react';
import {
    View,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles';

export default class SearchBox extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Icon name='magnify' size={22} color='#000' style={styles.iconSearch}/>
                <TextInput 
                    style={styles.textinputField}
                    placeholder={this.props.placeholder}
                    onChangeText={txtInput => {this.props.onChangeText()}}
                    onSubmitEditing={() => {this.props.onSubmit()}}
                    value={this.props.value}
                    ref='component_searchbox_textinput'
                    returnKeyType="search"
                    underlineColorAndroid='transparent'
                />
            </View>
        )
    }
}
