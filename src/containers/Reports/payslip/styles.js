
export default {
    container: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'column'
    },

    content: {
        container: {
            flex: 1,
            flexDirection: 'row'
        },

        placeholder: {
            flex: 1,
            flexDirection: 'column',
            borderWidth: 1
        }
    },

    header: {
        container: {
            padding: 10,
            backgroundColor: 'orange',
            flexDirection: 'row'
        },

        left: {
            backgroundColor:'blue',
            padding: 10
        },

        right: {
            backgroundColor:'indigo',
            padding: 10
        }
        
    },

    title: {
        container: {
            padding: 10,
            backgroundColor:'yellow',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    
    body: {
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: 'green',
            flexDirection: 'column'
        },

        params: {
            flex: 1,
            flexDirection: 'row'
        },

        paramsVal: {
            flex: 1
        }

    },


}