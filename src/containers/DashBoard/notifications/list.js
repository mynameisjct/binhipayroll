//RN Packages andd Modules
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';

//Styles
import styles from './styles';

//Children Components
import NotificationsItem from './item';

class NotificationsList extends Component {

    _keyExtractor = (item, index) => item.id;

    render(){
        const listStyles = styles.listStyles;

        return(
            <View style={[listStyles.container, this.props.flexValue ? {flex: this.props.flexValue} : {}]}>
                <FlatList
                    ref={(ref) => { this.flatListRef = ref; }}
                    data={this.props.list}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => 
                        <NotificationsItem
                            item={item} 
                            itemPressed={(pressedItem) => this._setActiveChild(pressedItem)}/>
                    }
                />
            </View>
        )
    }
}

export default NotificationsList;