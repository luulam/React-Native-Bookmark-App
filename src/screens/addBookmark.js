import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Header, Icon, Button, InputText, SelectTags, ModalCreateTag } from '../components'
import { constants, colors, configs } from '../configs'
import { string } from '../assets'

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
                    onPress={() => this.props.navigation.goBack()} />
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
                style={styles.constant}
            >
                {this.renderHeader()}
                {this.renderSelectTag()}
                {this.renderContent()}
            </View>
        )
    }

    _onVerify = () => {
        if (this.inputContent.text().length < 0) {

        }
    }
    
    _onCreateBookmark = () => {
        console.log(this.setlectTags.getTag())
    }
}

const styles = StyleSheet.create({
    constant: {
        paddingTop: constants.statusBarHeight, flex: 1
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

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddBookmark)