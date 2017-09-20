import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import { Header, Icon, ListTags, Text } from '../components'
import { configs, constants, colors } from '../configs'
import { Tag } from '../helper'
import { string } from '../assets'
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
                style={styles.containers}
            >
                {this._renderHeader()}
                <Text text={string.info_remove_tags} italic style={{ marginHorizontal: 12 }} />
                {this._renderContent()}
            </View>
        )
    }

    componentDidMount() {
        let arrTagsDB = Tag.get().sorted('name');
        //first add data for list
        Tag.get().addListener((collection, changes) => {
            this.setState({
                dataTags: Tag.get().sorted('name')
            })
        });

        this.setState({
            dataTags: arrTagsDB,
        })
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1
    }
})

export default AllTags