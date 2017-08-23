import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View } from 'react-native'
import Realm from '../configs/realm'

class Home extends Component {
    componentWillMount() {
    
    }

    render() {
        return (
            <View >

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