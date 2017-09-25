import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Header, Icon, Button, InputText, SelectTags, ModalCreateTag } from '../components'
import { constants, colors, configs } from '../configs'
import { string } from '../assets'
import { Tag, Bookmark } from '../helper'
import actions from '../redux/actions'

class AddBookmark extends Component {

    constructor(props) {
        super(props)
        this.setlectTags = null;
        this.inputTitle = null;
        this.inputContent = null;

        this.state = {
            title: '',
            content: ''
        }
    }

    renderHeader = () => {
        return (
            <Header
                title='Create Bookmark'
            >
                <Icon
                    margin
                    name='ios-checkmark-outline'
                    onPress={() => this._onCreateBookmark()} />
                <Icon
                    margin
                    name='ios-close-outline'
                    onPress={() => this._onBack()} />
            </Header>
        )
    }

    renderSelectTag = () => {
        return (
            <View>
                <Text
                    text={string.tag}
                    bold
                    italic
                    style={styles.name} />
                <SelectTags
                    ref={(component) => this.setlectTags = component} />
            </View>
        )
    }

    renderContent = () => {
        let { title, content } = this.state
        return (
            <View>
                <Text
                    text={string.content}
                    bold
                    italic
                    style={styles.name} />
                <InputText
                    ref={(compo) => this.inputTitle = compo}
                    hint={string.title}
                    autoFocus
                    hintTop
                    multiline
                    maxLength={configs.max_input_title} />
                <InputText
                    ref={(compo) => this.inputContent = compo}
                    hint={string.content}
                    hintTop
                    multiline
                    maxLength={configs.max_input_content} />
            </View>
        )
    }

    render() {
        return (
            <View
                style={styles.containers}
            >
                {this.renderHeader()}
                {this.renderSelectTag()}
                {this.renderContent()}
            </View>
        )
    }
    _onBack = () => {
        if (this._onVerify()) {
            this.props.showDialog(string.warning, string.warning_add_bookmark_exist, [
                {
                    title: string.ok, onPress: () => {
                        this.props.hideDialog()
                        this.props.navigation.goBack()
                    }
                },
                { title: string.canner, onPress: () => this.props.hideDialog() }
            ])
        } else {
            this.props.navigation.goBack()
        }

    }
    _onVerify = () => {
        if (this.inputTitle.text().length === 0) {
            this.inputTitle.showError('Input title')
        }

        if (this.inputContent.text().length === 0) {
            this.inputContent.showError('Input content')
            return false
        }

        if (this.setlectTags.wrappedInstance.getTag().length === 0) {
            this.props.showNotify('Please add a Tag')
            return false
        }
        return true
    }

    _onCreateBookmark = () => {
        if (!this._onVerify()) return

        Tag.addAll(this.setlectTags.wrappedInstance.getTag())
            .then((arr) => {
                let arrTags = Tag.get().filter(tag => arr.filter(v => v.name === tag.name).length !== 0)
                Bookmark.add({
                    content: this.inputContent.text(),
                    title: this.inputTitle.text(),
                    hide: false,
                    tags: arrTags
                })
                this.props.navigation.navigate('Home')


            }).catch((error) => {
                console.log('add error', error)
            })

    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1
    },
    name: {
        paddingLeft: constants.padHor * 2,
        paddingBottom: constants.padVer
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showNotify: (data) => actions.showNotify(dispatch)(data),
        showDialog: (title, message, button) => actions.showDialog(dispatch)(title, message, button),
        hideDialog: () => actions.hideDialog(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookmark)