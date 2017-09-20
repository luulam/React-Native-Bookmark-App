import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import { Header, Text, InputText, Icon, ListTags, ListBookmarks } from '../components'
import { configs, constants, colors } from '../configs'
import { Tag, Bookmark } from '../helper'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textSearch: '',
            dataTags: [],
            dataBookmarks: []
        }
    }
    _renderBookmarks = () => {
        let { textSearch, dataBookmarks } = this.state
        let data = dataBookmarks.filter(v => {
            return textSearch.length !== 0
                && (v.title.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1
                    || v.content.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1)
        })

        return (
            <ListBookmarks
                data={data}
            />
        )
    }

    _renderTag = () => {
        let { textSearch, dataTags } = this.state
        let data = dataTags.filter(v => {
            return textSearch.length !== 0
                && v.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1
        })

        return (
            <ListTags
                data={data}
                onPress={(v, i) => {
                    this.props.navigation.navigate('Bookmarks', { name: v.name })
                }}
            />
        )
    }

    render() {
        return (
            <View
                style={styles.containers}
            >
                <Header >

                    <InputText
                        onChangeText={(text) => {
                            this.setState({ textSearch: text })
                        }}
                        autoFocus
                        hint='Search'
                        styleConstant={styles.containersInput}
                        hideBottom />
                    <Icon
                        margin
                        name='ios-close-outline'
                        onPress={() => this.props.navigation.goBack()} />
                </Header>

                {this._renderTag()}
                {this._renderBookmarks()}

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
}

const styles = StyleSheet.create({
    containers: {
        flex: 1
    },
    containersInput: {
        flex: 1
    }
})

export default Search