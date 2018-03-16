import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom Components
import CustomPicker from '../../components/CustomPicker';

//Styles
import styles from './styles';

//constants
const COLOR_ICON = '#434646';
const COLOR_NOTIFICATION = '#434646';
const employer = {
    header: {
        iconName: 'md-home',
        iconSize: 50,
    },

    dropdown: {
        iconName: 'md-git-compare',
        iconSize: 15,
        color: '#505251'
    }
}

export default class SidebarHeader extends Component{
    constructor(props){
        super(props);
        this.state = {
            _bShowPicker: false
        }
    }
    _navigateHeaderView = () => {

    }

    _showPickerMenu = () => {
        this.setState({ _bShowPicker: true });
    }

    _onSelect = (id) => {
        this._hidePicker();
    }

    _hidePicker = () => {
        this.setState({ _bShowPicker: false });
    }

    render(){
        const headerStyles = styles.header;
        const textStyles = styles.textStyles;

        return(
            <View style={styles.header.container}>
                <TouchableNativeFeedback
                    onPress={this._navigateHeaderView}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={headerStyles.content}>
                        <View style={headerStyles.left}>
                            <Icon
                                size={employer.header.iconSize} 
                                name={employer.header.iconName} 
                                color={COLOR_ICON}  />
                        </View>
                        <View style={headerStyles.right}>
                            <Text style={textStyles.title}>
                                JCA REALTY CORPORATION
                            </Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={this._showPickerMenu}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={headerStyles.picker}>
                        <Icon
                            iconStyle={{elvation: 5}}
                            size={employer.dropdown.iconSize} 
                            name={employer.dropdown.iconName} 
                            color={employer.dropdown.color}  />
                    </View>
                </TouchableNativeFeedback>
                {
                    <CustomPicker 
                        list={[{label: 'JCA Realty Corporation ', id: 1}, {label: 'Bank of the Philippines', id: 2}]}
                        emptyprompt = 'Error: No data found'
                        title='SWITCH COMPANY'
                        onSelect={this._onSelect}
                        visible={this.state._bShowPicker}
                        onClose={this._hidePicker}/>
                }
            </View>
        )
    }
}