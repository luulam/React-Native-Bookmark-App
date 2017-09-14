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

    renderHeader = () => {
        return (
            <Header
                title='Home' />
        )
    }

    renderSearch = () => {
        return (
            <View
                style={styles.constantSearch}>
                <Text
                    text={string.search_of_bookmark}
                    align='center' />
            </View>
        )
    }

    renderContent = () => {
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
    renderListBookmarks = () => {
        const { dataBookmarks } = this.state
        return (
            <ListBookmarks data={dataBookmarks} />
        )
    }

    renderFabAdd = () => {
        return (
            <TouchableOpacity
                style={styles.fabAdd}
                activeOpacity={constants.opacity}
                onPress={() => this.onAddBookmark()}>
                <Icon
                    color={colors.white}
                    name='ios-add-outline'
                    onPress={() => this.onAddBookmark()} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View
                style={styles.constant}
            >
                {this.renderHeader()}

                {this.renderContent()}
                {this.renderListBookmarks()}
                {this.renderFabAdd()}
                <KeyboardHandleView />
            </View>
        )
    }

    componentDidMount() {
        let arrTagsDB = Tag.get();
        let arrBookmarksDB = Bookmark.get();

        arrTagsDB.addListener((collection, changes) => {
            this.setState({
                dataTags: collection
            })
        });

        arrBookmarksDB.addListener((collection, changes) => {
            this.setState({
                dataBookmarks: collection
            })
        });
        //first add data for list
        this.setState({
            dataTags: arrTagsDB,
            dataBookmarks: arrBookmarksDB
        })

    }

    componentWillUnmount() {
        Realm.removeAllListeners();
    }

    onAddBookmark = () => {
        this.props.navigation.navigate('AddBookmark')
    }
}

const styles = StyleSheet.create({
    constant: {
        paddingTop: constants.statusBarHeight,
        flex: 1
    },
    constantSearch: {
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