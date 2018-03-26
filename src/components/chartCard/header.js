
import React, { Component } from 'react';
import { View, Text } from 'react-native';

//Styles
import styles from './styles';

const headerStyles = styles.headerStyles;

const ChartCardHeader = (props) => 
    <View style={headerStyles.container}>
        <View style={headerStyles.left}>
            <Text style={styles.txtTitle}>
                {props.title || ''}
            </Text>
        </View>

        <View style={headerStyles.right}>
            <Text style={styles.txtDescription}>
                {props.description || ''}
            </Text>
        </View>
    </View>


export default ChartCardHeader;