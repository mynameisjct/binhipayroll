//RN Packages andd Modules
import React, { Component } from 'react';
import {
    View
} from 'react-native';

//Styles
import styles from './styles';

//Children Components
import StatsHeader from './header';
import StatsDetails from './details';

class DashboardStatistics extends Component {
    constructor(props){
        super(props);
        this.state = {
            _oData: {
                datetimeinfo: {
                    title: 'TODAY',
                    description: 'AS OF MAR 3, 2018\nTUE, 12:00:00 PM'
                },

                companyinfo: {
                    label: 'COMPANY',
                    value: 'JCA Realty Incorporated'
                },

                employees:{
                    label: 'ACTIVE EMPLOYEES',
                    value: 103
                },

                workingdays: {
                    label: '2018 WORKING DAYS',
                    value: 307
                },

                today: [
                    {
                        id: '0001',
                        label: 'CLOCKED IN',
                        value: 100,
                        icon: 'human-greeting',
                        iconcolor: '#009e0f',
                        contlabelbg: '#009e0f',
                        contstatsbg: '#93c47d',
                        statsborderColor: '#009e0f',
                        textstats: '#009e0f'
                    },
                    {
                        id: '0002',
                        label: 'ABSENCES',
                        value: 3,
                        icon: 'timer-off',
                        iconcolor: '#cc0000',
                        contlabelbg: '#cc0000',
                        contstatsbg: '#ea9999',
                        statsborderColor: '#cc0000',
                        textstats: '#cc0000'
                    },
                    {
                        id: '0003',
                        label: 'LATES',
                        value: 7,
                        icon: 'clock-alert',
                        iconcolor: '#bf9000',
                        contlabelbg: '#bf9000',
                        contstatsbg: '#ffe599',
                        statsborderColor: '#bf9000',
                        textstats: '#bf9000'
                    },
                    {
                        id: '0004',
                        label: 'ON LEAVE',
                        value: 0,
                        icon: 'alarm-check',
                        iconcolor: '#085394',
                        contlabelbg: '#085394',
                        contstatsbg: '#a2c4c9',
                        statsborderColor: '#085394',
                        textstats: '#085394'
                    }
                ]
            }
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <StatsHeader data={this.state._oData}/>
                <StatsDetails data={this.state._oData}/>
            </View>
        )
    }
}

export default DashboardStatistics;