import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native'
import { Button, Text, InputText, Icon, ModalCreateTag } from './'
import { constants, colors, configs } from '../configs'
import { string } from '../assets'
import { Tag } from '../helper/dataBase'

/**
 * @param {arr realm resuft} data 
 * @param {func} onPress
 */

export default class ListTags extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props)
        this.inputTag = null;
        this.state = {
            tagsSelect: [],
            tagsSuggest: [],
            tags: [],
            textInputTag: ''
        }
    }

    _renderItem = (v, i) => {
        return <Button
            onPress={() => { this._removeSelect(i) }}
            style={{ marginLeft: constants.padHor, marginBottom: constants.padVer }}
            key={i}
            backgroundColor={v.color}
            title={`#${v.name}`}
        />
    }

    _renderTagSelect = () => {
        let { tagsSelect } = this.state
        return <View style={styles.listTags}>
            {tagsSelect.map(this._renderItem)}
        </View>
    }

    _renderInputAdd = () => {
        return <InputText
            hintTop={true}
            maxLength={configs.max_input_tag}
            ref={(compo) => this.inputTag = compo}
            hint='Input name tag #'
            onChangeText={(text) => { this.setState({ textInputTag: text }) }}
        />
    }

    _renderSuggest = () => {
        let { tags, textInputTag } = this.state
        return <View
            style={styles.listTags}
        >
            {textInputTag.length !== 0
                ? <Button
                    title={string.add}
                    onPress={() => this.modal.show({ name: textInputTag })} >
                    <Icon
                        style={{ paddingLeft: constants.padVer }}
                        size={constants.icon}
                        name='ios-add-circle-outline'
                        color={colors.white}
                        onPress={() => this.modal.show({ name: textInputTag })} />
                </Button>
                : null
            }
            {tags
                .filter((v) => v.name.indexOf(textInputTag) !== -1)
                .map((v, i) => <Text
                    text={textInputTag}
                />)
            }
        </View>
    }

    render() {
        let { tagsSelect, textInputTag } = this.state
        return (
            <View style={styles.constant}>
                <ModalCreateTag
                    ref={(component) => this.modal = component}
                    onHide={this._onHideModal}
                />
                {this._renderTagSelect()}
                {this._renderInputAdd()}
                {this._renderSuggest()}
            </View >

        )
    }

    componentDidMount() {
        let arrTagsDB = Tag.get();
        arrTagsDB.addListener((collection, changes) => {
            this.setState({ tags: collection })
        });
        //first add data for list
        this.setState({ tags: arrTagsDB })
    }

    _onHideModal = ({ add, name, color }) => {
        if (add) {
            this._addSelect(name, color)
        }
        // console.log('_onHideModal', add, name, color)
    }

    _addSelect = (name, color) => {
        let { tagsSelect } = this.state
        this.setState({
            tagsSelect: tagsSelect.concat({ name, color })
        })
    }

    _removeSelect = (index) => {
        let { tagsSelect } = this.state
        this.setState({
            tagsSelect: tagsSelect.splice(index, 1)
        })
    }

    _getTagSuggest = () => {
        textInputTag
        let textinput = this.inputTag.text();
        return textinput
    }
}

const styles = StyleSheet.create({
    constant: {
        marginVertical: constants.padVer,
    },
    listTags: {
        marginLeft: constants.padHor,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})