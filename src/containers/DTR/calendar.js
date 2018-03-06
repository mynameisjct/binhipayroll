/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

//Styles
import styles from './styles';

//Children Components
import DTRItem from './dailyItem';
import DTRTimeForm from './timeForm';

export default class DTRCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        _strFormTitle: '',
        _bShowTimeForm: false,
        _activeTimeData: {
          employeename: '',
          date: '',
          oldtime: '',
          newtime: null,
          remarks: '',
        },
        items: this.props.data,
        selected: '2018-02-26'
    };
  }

  _onModifyTimeIn = (oDate, oTime) => {
    console.log('_onModifyTimeIn_oDate: ' + oDate);
    console.log('_onModifyTimeIn_oTime: ' + oTime);
    let oActive = {...this.state._activeTimeData};
    oActive.employeename = 'TEMP'; //TEMP
    oActive.date = oDate;
    oActive.oldtime = oTime;
    oActive.newtime = null;
    oActive.remarks = '';
    this.setState({
        _activeTimeData: oActive,
        _strFormTitle: 'MODIFY EMPLOYEE TIME-IN',
        _bShowTimeForm: true
    })
  }

  _onModifyTimeOut = (oDate, oTime) => {
    let oActive = {...this.state._activeTimeData};
    oActive.employeename = 'TEMP'; //TEMP
    oActive.date = oDate;
    oActive.oldtime = oTime;
    oActive.newtime = null;
    oActive.remarks = '';
    this.setState({
        _activeTimeData: oActive,
        _strFormTitle: 'MODIFY EMPLOYEE TIME-OUT',
        _bShowTimeForm: true
    })
  }

  _onDayPress = (day) => {
    this.setState({
        selected: '2018-02-26'
    });
  }

    _hideTimeForm = () => {
        this.setState({
            _strFormTitle: '',
            _bShowTimeForm: false
        })
    }

    _onSubmit = () => {
        this._hideTimeForm();
    }

  render() {
    console.log('this.state.items: ' + JSON.stringify(this.state.items));
    return (
        <View style={styles.container}>
            <Agenda
                style={styles.container}
                items={this.state.items.currentperiod.details}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={this.state.selected}
                onDayPress={this._onDayPress}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                minDate={'2018-02-26'}
                maxDate={'2018-03-10'}
                markingType={'multi-dot'}
                markedDates={this.state.items.currentperiod.markings}
                pastScrollRange={1}
                futureScrollRange={2}
                // agenda theme
                theme={{
                agendaDayTextColor: '#838383',
                agendaDayNumColor: '#434646',
                agendaTodayColor: '#505251',
                agendaKnobColor: '#EEB843'
                }}
            />
            {
              this.state._bShowTimeForm ? 
                <DTRTimeForm
                  data={this.state._activeTimeData}
                  visible={this.state._bShowTimeForm}
                  title={this.state._strFormTitle}
                  onCancel={this._hideTimeForm}
                  onOK={this._onSubmit}/>
              :
                null
            }
            
        </View>
    );
  }
  loadItems(day) {
    /* setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`); */
  }

  renderItem(item) {
    let oLabels = this.state.items.labels;
    let oTimeIn = {...item.data.timein};
    let oTimeOut = {...item.data.timeout};
    let aValidations = [...item.data.rulesvalidation];
    let iValidationsLen = item.data.rulesvalidation.length;
    
    return (
      /* <View style={[styles.item, {height: 60}]}><Text>{JSON.stringify(item.data.timein)}</Text></View> */
      <View style={styles.itemStyle.container}>
        <DTRItem
          date={item.data.date}
          name={oLabels.timein} 
          value={oTimeIn.value}
          remarks={oTimeIn.remarks} 
          remarksColor={null}
          showButton={true} 
          buttonTitle='MODIFY TIME-IN '
          onPress={this._onModifyTimeIn}/>

        <DTRItem 
          date={item.data.date}
          name={oLabels.timeout} 
          value={oTimeOut.value}
          remarks={oTimeOut.remarks}
          remarksColor={null}
          showButton={true} 
          hideBorder={iValidationsLen===0 ? true : false}
          buttonTitle='MODIFY TIME-OUT'
          onPress={this._onModifyTimeOut}/>

        {
          aValidations.map((oData, index) => 
            <DTRItem 
              date={item.data.date}
              hideBorder={(iValidationsLen-1)===index ? true : false}
              key={index}
              name={oData.label} 
              value={oData.value}
              remarks={oData.remarks}
              remarksColor={oData.color}/>
          )
        }
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

