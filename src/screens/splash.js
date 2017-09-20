import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import { Header } from '../components'
import { configs, constants, colors } from '../configs'

class AllTags extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <View
                style={styles.containers}
            >
                <Header title='All Tags' />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1
    }
})

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
export default connect(mapStateToProps, mapDispatchToProps)(AllTags)