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

    _onSelect = (id) => {
        this._hidePicker();
        this.props.onPeriodSwitch(id);
    }
    
    _hidePicker = () => {
        this.setState({
            _bShowPicker: false
        })
    }

    render(){
        const headerStyles = styles.header;
        const oCurPeriod = this.props.data.currentperiod;
        const oData = this.props.data;

        return(
            <View style={headerStyles.container}>
                <View style={headerStyles.contLeft}>
                </View>
                <View style={headerStyles.contCenter}>
                    <View style={headerStyles.contPeriodDescription}>
                        <Text style={headerStyles.txtTitle}>{oCurPeriod.description}</Text>
                    </View>
                    <View style={headerStyles.contSchedule}>
                        <View style={headerStyles.contPeriod}>
                            <Text style={headerStyles.txtSchedule}>{oCurPeriod.period.label}</Text>
                        </View>
                        <View style={headerStyles.contDivider}>
                        </View>
                        <View style={headerStyles.contPayroll}>
                            <Text style={headerStyles.txtSchedule}>{oCurPeriod.payroll.label}</Text>
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
                            list={oData.payrollperiod}
                            dateformat={oData.datedisplayformat}
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
