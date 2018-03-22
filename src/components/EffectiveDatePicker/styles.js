export default {
    container: {
        flexDirection: 'row',
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        height: 90,
        backgroundColor: '#FFF',
        borderColor: '#D1D4D6',
        borderWidth: 1.5
    },

    remarks: {
        container: {
            width: 200,
            borderTopRightRadius: 4,
            backgroundColor: '#FFF',
            flexDirection: 'column'
        },

        top: {
            borderTopRightRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            height: 35,
            justifyContent: 'center',
            backgroundColor: '#838383'
        },

        bottom: {
            paddingLeft: 10,
            flex: 1,
            backgroundColor: '#D1D4D6'
        },
        
        scrollview: {
            justifyContent: 'center'
        }
    },

    contInfo: {
        flex: 1,
        flexDirection: 'row',
        borderTopLeftRadius: 4,
        backgroundColor: 'transparent',
    },

    contInfoLabel: {
        paddingLeft: 35,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    contInfoData: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },

    pickerContainer: {
        borderRadius: 5,
        backgroundColor: 'transparent',
        width: 300,
        height: 40,
        borderWidth: 1.5,
        borderColor: '#D1D4D6',
        paddingLeft: 10
    },

    namePickerStyle: {
        height: 37,
        width: '100%'
    },

    txtInfo: {
        fontFamily: 'Helvetica-Light',
        fontSize: 16,
        color: '#434646'
    }
}