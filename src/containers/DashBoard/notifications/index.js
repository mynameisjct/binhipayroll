//RN Packages andd Modules
import React, { Component } from 'react';
import {
    View
} from 'react-native';

//Styles
import styles from './styles';

//Children Components
import NotificationsList from './list';
import NotificationsHeader from './header';

class Notifications extends Component {
    constructor(props){
        super(props);
        this.state = {
            _activeItem: null,
            _list: [
                {
                    id: '000',
                    type: 'grouplabel',
                    label: 'Current Period'
                },
                {
                    id: '0001',
                    type: 'error',
                    date: '2018-03-14',
                    details: [
                        'Date: Mar 14, 2018 Wed',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0002',
                    type: 'success',
                    date: '2018-03-15',
                    details: [
                        'Date: Mar 15, 2018 Thu',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'warning',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'error',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'error',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'warning',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'error',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'error',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'warning',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'error',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '000',
                    type: 'grouplabel',
                    label: 'Previous Periods'
                },
                {
                    id: '0004',
                    type: 'error',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0005',
                    type: 'info',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0006',
                    type: 'success',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'warning',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'error',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'warning',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'warning',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                },
                {
                    id: '0003',
                    type: 'error',
                    date: '2018-03-16',
                    details: [
                        'Date: Mar 16, 2018 Fri',
                        'Type: Tardiness',
                        'Employee: Dubluis, Lyndell',
                        'Remarks: Test'
                    ],
                    actiontype: 'confirmation'
                }
            ]
        }
    }

    render(){
        const listStyles = styles.listStyles;
        return(
            <View style={listStyles.container}>
                <NotificationsHeader/>
                <NotificationsList 
                    list={this.state._list} 
                    flexValue={1}
                />
            </View>
        )
    }
}

export default Notifications;