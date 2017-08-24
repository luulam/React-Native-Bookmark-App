import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View } from 'react-native'
import Realm from '../configs/realm'
import { Text, Header, Icon, Button } from '../components'
import { constants } from '../configs/theme'

class Home extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <View style={{ paddingTop: constants.statusBarHeight, flex: 1, }}>
                <Header title='Home' >
                    <Icon name='ios-checkmark-outline' />
                    <Icon name='ios-close-outline' />
                </Header>
                <View>
                    
                </View>
            </View>
        )
    }

    componentDidMount() {

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // showSnackBar: (data) => dispatch(showSnackBar(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)