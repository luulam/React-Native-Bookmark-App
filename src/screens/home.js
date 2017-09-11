import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Realm from '../configs/realm'
import { Tag, Bookmark } from '../helper/dataBase'
import { Text, Header, Icon, Button, ListTags, InputText, ModalCreateTag } from '../components'
import { constants, colors } from '../configs'
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
                data={dataTags}
                onPress={(v, i) => {
                    Tag.remove(v.id)
                }} />
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
                style={{ paddingTop: constants.statusBarHeight, flex: 1 }} >
                {this.renderHeader()}
                {this.renderSearch()}
                {this.renderContent()}
                {this.renderFabAdd()}
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
        console.log(arrTagsDB.map(v => Object.assign({}, v)))
        console.log(arrBookmarksDB.map(v => Object.assign({}, v)))
        //first add data for list
        this.setState({
            dataTags: arrTagsDB,
            dataBookmarks: arrBookmarksDB
        })
        console.log('aa',typeof (new Date().toString()))
    }

    componentWillUnmount() {
        Realm.removeAllListeners();
    }

    onAddBookmark = () => {
        this.props.navigation.navigate('AddBookmark')
    }
}

const styles = StyleSheet.create({
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
        borderRadius: constants.fab / 2
    }
})

const mapStateToProps = (state, ownProps) => ({
    state
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    showNotify: (data) => (actions.showNotify(dispatch)(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)