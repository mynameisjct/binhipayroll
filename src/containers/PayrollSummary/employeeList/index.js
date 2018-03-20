import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

//Custom Components
import FormModal from '../../../components/FormModal';

//Styles
import styles from '../styles';

//Children components
import PayrollEmployeeListHeader from './header';
import PayrollEmployeeListFooter from './footer';
import PayrollEmployeeListBody from './body';

export default class PayrollSummaryEmployeeList extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){
        const fromStyles = styles.form;
        const summaryStyles = styles.summaryStyles;
        return(
            <View style={summaryStyles.container}>
                <PayrollEmployeeListHeader data={this.props.data}/>
                <PayrollEmployeeListBody data={this.props.data}/>
                <PayrollEmployeeListFooter data={this.props.data}/>
                <FormModal 
                    containerStyle={fromStyles.container}
                    visible={true}
                    onCancel={this._onCancel}
                    onOK={this._onSubmit}
                    title={this.props.title}>
                    
                    <View style={fromStyles.content}>
                        
                    </View>
                </FormModal>
            </View>
        );
    }
}