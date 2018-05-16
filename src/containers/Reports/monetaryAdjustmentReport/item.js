import React, { Component, PureComponent } from 'react';
import {
    View,
    Text
} from 'react-native';

//Styles
import { SimpleCard } from '../../../components/CustomCards';

export default class MonetaryAdjustmentReportItem extends PureComponent{

    _onCancel = () => {
        alert('I AM CANCELLED');
    }

    _onApprove = () => {
        alert('I AM APPROVED');
    }

    render(){
        let item = this.props.item;
        return(
            <SimpleCard 
                menu={[
                    {onSelect: this._onCancel, label: 'Cancel'},
                    {onSelect: this._onApprove, label: 'Approve'},
                ]}/>
        )
    }
}