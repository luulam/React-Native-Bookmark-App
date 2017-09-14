import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import { Button, Text, InputText, Icon, ModalCreateTag } from './'
import { constants, colors, configs } from '../configs'
import { string } from '../assets'
import { Tag } from '../helper'
import update from 'immutability-helper';
import actions from '../redux/actions'

class ListTags extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props)
        this.inputTag = null;
        this.state = {
            tagsSelect: [],
            tagsSuggest: [],
            tagsExists: [],
            textInputTag: ''
        }
    }

    _renderItem = (v, i) => {
        return <Button
            key={i}
            onPress={() => { this._removeSelect(i) }}
            style={{ marginLeft: constants.padHor, marginBottom: constants.padVer }}
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
            ref={(conponent) => this.inputTag = conponent}
            hintTop={true}
            maxLength={configs.max_input_tag}
            hint='Input name tag #'
            onChangeText={(text) => { this.setState({ textInputTag: text }) }}
        />
    }

    _renderSuggest = () => {
        let { tagsExists, textInputTag, tagsSelect } = this.state
        return <View
            style={styles.listTags}
        >
            {textInputTag.length !== 0
                ? <Button
                    style={styles.marginTag}
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
            {textInputTag.length !== 0
                ? tagsExists
                    .filter((v) => {
                        return tagsSelect.filter(vS => vS.name === v.name).length === 0
                    })
                    .filter((v) => v.name.indexOf(textInputTag) !== -1)
                    .map((v, i) => <Button
                        style={styles.marginTag}
                        backgroundColor={v.color}
                        title={v.name}
                        key={i}
                        onPress={() => this._addSelect(v.name, v.color)}
                    />)
                : null
            }
        </View>
    }

    render() {
        let { tagsSelect, textInputTag } = this.state
        return (
            <View style={styles.containers}>
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
            this.setState({ tagsExists: collection })
        });
        //first add data for list
        this.setState({ tagsExists: arrTagsDB })
    }

    _onHideModal = ({ add, name, color }) => {
        if (add) this._addSelect(name, color)
    }

    _addSelect = (name, color) => {
        let { tagsSelect } = this.state
        if (tagsSelect.filter(v => v.name === name).length === 0) {
            this.setState({
                tagsSelect: tagsSelect.concat({ name, color }),
            })
        }
        this.inputTag.removeText()
    }

    _removeSelect = (index) => {
        let { tagsSelect } = this.state
        this.setState({
            tagsSelect: update(tagsSelect, { $splice: [[index, 1]] })
        })
    }

    _getTagSuggest = () => {
        let textinput = this.inputTag.text();
        return textinput
    }

    getTag = () => {
        let { tagsSelect } = this.state;
        return tagsSelect;
    }
}


const styles = StyleSheet.create({
    containers: {
        marginVertical: constants.padVer,
    },
    listTags: {
        marginLeft: constants.padHor,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    marginTag: {
        marginLeft: constants.padHor,
        marginTop: constants.padVer
    }
})


const mapDispatchToProps = (dispatch, ownProps) => ({
    showNotify: (data) => (actions.showNotify(dispatch)(data))
})

export default connect(null, mapDispatchToProps, null, { withRef: true })(ListTags)
