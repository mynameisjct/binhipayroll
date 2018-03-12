import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Children Components
import CustomPicker from '../../components/CustomPicker';

//Styles
import styles from './styles';

export default class DTRHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            _bShowPicker: false,
            _bHasError: false
        }
    }

    _onPeriodChange = () => {
        this.setState({
            _bShowPicker: true
        })
    }

    _onSelect = () => {
        this._hidePicker();
    }
    
    _hidePicker = () => {
        this.setState({
            _bShowPicker: false
        })
    }

    render(){
        const headerStyles = styles.header;

        return(
            <View style={headerStyles.container}>
                <View style={headerStyles.contLeft}>
                </View>
                <View style={headerStyles.contCenter}>
                    <View style={headerStyles.contPeriodDescription}>
                        <Text style={headerStyles.txtTitle}>CURRRENT PERIOD</Text>
                    </View>
                    <View style={headerStyles.contSchedule}>
                        <View style={headerStyles.contPeriod}>
                            <Text style={headerStyles.txtSchedule}>PERIOD: Oct 11 to Oct 25, 2017</Text>
                        </View>
                        <View style={headerStyles.contDivider}>
                        </View>
                        <View style={headerStyles.contPayroll}>
                            <Text style={headerStyles.txtSchedule}>PAYROLL DATE: Oct 30, 2017</Text>
                        </View>
                    </View>
                </View>
                <View style={headerStyles.contRight}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={this._onPeriodChange}>
                        <Icon name='calendar-clock' size={35} color='#EEB843'/>
                    </TouchableOpacity>
                </View>
                {
                    this.state._bShowPicker ? 
                        <CustomPicker 
                            list={this.props.data.payrollperiod}
                            dateformat={this.props.data.datedisplayformat}
                            emptyprompt = 'Error: No data found'
                            title='SELECT PAYROLL PERIOD'
                            onSelect={this._onSelect}
                            visible={this.state._bShowPicker}
                            onClose={this._hidePicker}/>
                    :
                        null
                }
                
            </View>
        )
    }
}
