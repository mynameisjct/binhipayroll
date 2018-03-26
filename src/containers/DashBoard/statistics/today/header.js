
import React, { Component } from 'react';
import { View, Text } from 'react-native';

//Styles
import styles from '../styles';

const todayHeaderStyles = styles.todayHeaderStyles;
const textStyles = styles.textStyles;

const StatsTodayHeader = (props) => 
    <View style={todayHeaderStyles.container}>
        <View style={todayHeaderStyles.left}>
            <Text style={textStyles.groupTitle}>
                {props.datetimeinfo.title}
            </Text>
        </View>

        <View style={todayHeaderStyles.right}>
            <Text style={textStyles.groupDescription}>
                {props.datetimeinfo.description}
            </Text>
        </View>
    </View>


export default StatsTodayHeader;