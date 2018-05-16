import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

//Children Components
import ReportContent from '../reportContent';
import GenericContainer from '../../../components/GenericContainer';
import MonetaryAdjustmentReportItem from './item';

//Styles
import styles from '../styles';

//Constants
const TITLE = 'SPECIAL DEDUCTIONS AND ALLOWANCES';

export default class MonetaryAdjustmentReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: [1, 'Loading...'],
            _refreshing: false,
            _data: [
                {
                    id: 1,
                    msg: 'TEST'
                },
                {
                    id: 1,
                    msg: 'TEST'
                },
                {
                    id: 1,
                    msg: 'TEST'
                },
                {
                    id: 1,
                    msg: 'TEST'
                },
                {
                    id: 1,
                    msg: 'TEST'
                },
                {
                    id: 1,
                    msg: 'TEST'
                },
                {
                    id: 1,
                    msg: 'TEST'
                },
                {
                    id: 1,
                    msg: 'TEST'
                },
                {
                    id: 1,
                    msg: 'TEST'
                },
            ],

            loadingScreen: {
                show: false,
                msg: 'test'
            },
            msgBox: {
                show: false,
                type: '',
                msg: '',
                param: ''
            },
            
        }
    }

    _fetchDataFromDB = () => {
    }

    _onCancelTransaction = () => {
    }

    _keyExtractor = (item, index) => item.id;

    render(){
        let item = this.props.item;
        let oBody = null;
        let aFilters = [];

        if(this.state._status[0] == 1){
            oBody =
                <FlatList
                    contentContainerStyle={styles.reportsFlatlist}
                    ref={(ref) => { this.flatListRef = ref; }}
                    extraData={this.state._activeItem}
                    keyExtractor={this._keyExtractor}
                    data={this.state._data}
                    renderItem={({item}) =>
                        <MonetaryAdjustmentReportItem
                            item={item} 
                            onCancel={this._onCancelTransaction}/>
                    }
                />

            aFilters = [];
        }

        return(
            <GenericContainer
                msgBoxShow = {this.state.msgBox.show}
                msgBoxType = {this.state.msgBox.type}
                msgBoxMsg = {this.state.msgBox.msg}
                msgBoxOnClose = {this._msgBoxOnClose}
                msgBoxOnYes = {this._msgBoxOnYes}
                containerStyle = {styles.container}
                msgBoxParam = {this.state.msgBox.param}
                loadingScreenShow = {this.state.loadingScreen.show}
                loadingScreenMsg = {this.state.loadingScreen.msg}
                status={this.state._status}
                title={TITLE}
                onRefresh={this._fetchDataFromDB}>

                <ReportContent
                    title={TITLE}
                    body={oBody}
                    filters={aFilters}
                />

            </GenericContainer>
        )
    }
}