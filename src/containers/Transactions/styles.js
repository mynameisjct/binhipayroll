export default {
    container: {
        flex:1,
        backgroundColor: '#f9f9f9',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    contRow: {
       flexDirection: 'row'
    },

    placeholder: {
        width: '65%',
        height: '65%',
        /* backgroundColor: 'yellow', */
        justifyContent: 'center',
        paddingBottom: 50
    },

    contCol:{
        flex: 1,
        backgroundColor: '#EEB843',
        borderWidth: 1,
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 18,
        paddingBottom: 15,
        margin: 15,
        borderRadius: 15,
        borderColor: '#FFF',
        elevation: 10,
        flexDirection: 'row'
    },

    contEmpty:{
        backgroundColor: 'transparent',
        borderWidth: 0,
        elevation: 0
    },

    btn: {
        container: {
            flex: 1,
            /* backgroundColor: 'red', */
            flexDirection: 'column'
        },

        icon: {
            /* backgroundColor: 'green', */
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10
        },
        
        label: {
            paddingTop: 5,
            /* backgroundColor: 'violet', */
            marginLeft: 12,
            marginRight: 12,
            borderTopWidth: 1,
            borderColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
        },
        
        txt: {
            textAlignVertical: 'center',
            textAlign: 'center',
            fontFamily: 'Helvetica-Bold',
            fontSize: 14,
            fontWeight: '300',
            color: '#505251'
        }
    }
}