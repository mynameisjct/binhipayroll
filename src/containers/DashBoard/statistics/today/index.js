
import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

//Styles
import styles from '../styles';

//Children Components
import StatsTodayItem from './item';
import StatsTodayHeader from './header';

class StatsToday extends Component {

    _keyExtractor = (item, index) => item.id;

    render(){
        const todayStyles = styles.todayStyles;
        return(
            <View style={todayStyles.container}>
                <StatsTodayHeader {...this.props.data}/>
                <FlatList
                    contentContainerStyle={todayStyles.flatListStyle}
                    horizontal={true}
                    ref={(ref) => { this.flatListRef = ref; }}
                    data={this.props.data.today}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => 
                        <StatsTodayItem item={item}/>
                    }
                />
            </View>
        )
    }
}

export default StatsToday;