import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Realm from '../configs/realm'
import { Tag, Bookmark } from '../helper'
import { Text, Header, Icon, Button, ListTags, InputText, ModalCreateTag, ListBookmarks, KeyboardHandleView } from '../components'
import { constants, colors, styleApp } from '../configs'
import { string } from '../assets'
import actions from '../redux/actions'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataTags: [],
            dataBookmarks: []
        }
    }

    _renderHeader = () => {
        return (
            <Header
                title='Home' />
        )
    }

    _renderSearch = () => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Search')}
                activeOpacity={constants.opacity}
                style={styles.containersSearch}>
                <Text
                    text={string.search_of_bookmark}
                    align='center' />
            </TouchableOpacity>
        )
    }

    _renderContent = () => {
        const { dataTags } = this.state
        return (
            <ListTags
                isSeeAll
                data={dataTags}
                onPress={(v, i) => {
                    if (v === i) {
                        this.props.navigation.navigate('AllTags')
                    } else {
                        this.props.navigation.navigate('Bookmarks', { name: v.name })
                    }
                }} />
        )
    }
    _renderListBookmarks = () => {
        const { dataBookmarks } = this.state
        return (
            <ListBookmarks data={dataBookmarks} />
        )
    }

    _renderFabAdd = () => {
        return (
            <TouchableOpacity
                style={styles.fabAdd}
                activeOpacity={constants.opacity}
                onPress={() => this._onAddBookmark()}
            >
                <Icon
                    color={colors.white}
                    name='ios-add-outline'
                    onPress={() => this._onAddBookmark()} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View
                style={styles.containers}
            >
                {this._renderHeader()}
                {this._renderSearch()}
                {this._renderContent()}
                {this._renderListBookmarks()}
                {this._renderFabAdd()}
                <KeyboardHandleView />
            </View>
        )
    }

    componentDidMount() {
        Tag.get().addListener((collection, changes) => {
            this.setState({
                dataTags: Tag.get()
            })
        });

        Bookmark.get().addListener((collection, changes) => {
            this.setState({
                dataBookmarks: Bookmark.get()
            })
        });
        //first add data for list
        this.setState({
            dataTags: Tag.get(),
            dataBookmarks: Bookmark.get()
        })
    }

    componentWillUnmount() {
        Realm.removeAllListeners();
    }

    _onAddBookmark = () => {
        this.props.navigation.navigate('AddBookmark')
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1
    },
    containersSearch: {
        backgroundColor: colors.border,
        justifyContent: 'center',
        height: constants.navBarHeight
    },
    fabAdd: {
        position: 'absolute',
        bottom: constants.padHor * 5,
        right: constants.padHor * 2,
        backgroundColor: colors.access,
        width: constants.fab,
        height: constants.fab,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: constants.fab / 2,
        ...styleApp.shadow
    }
})

const mapStateToProps = (state, ownProps) => ({
    state
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    showNotify: (data) => actions.showNotify(dispatch)(data),
    showDialog: (title, message, button) => actions.showDialog(dispatch)(title, message, button),
    hideDialog: () => actions.hideDialog(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)