import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import { Header, Icon, ListTags } from '../components'
import { configs, constants, colors } from '../configs'
import { Tag } from '../helper'

class AllTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataTags: []
        }
    }
    _renderHeader = () => {
        return (
            <Header
                title='All Tags'
            >
                <Icon
                    margin
                    name='ios-close-outline'
                    onPress={() => this.props.navigation.goBack()} />
            </Header>

        )
    }
    _renderContent = () => {
        const { dataTags } = this.state
        return (
            <ListTags
                data={dataTags}
                onPress={(v, i) => {
                    this.props.navigation.navigate('Bookmarks', { name: v.name })
                }} />
        )
    }
    render() {
        return (
            <View
                style={styles.constant}
            >
                {this._renderHeader()}
                {this._renderContent()}
            </View>
        )
    }

    componentDidMount() {
        let arrTagsDB = Tag.get().sorted('name');
        //first add data for list
        this.setState({
            dataTags: arrTagsDB,
        })
    }
}

const styles = StyleSheet.create({
    constant: {
        paddingTop: constants.statusBarHeight,
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