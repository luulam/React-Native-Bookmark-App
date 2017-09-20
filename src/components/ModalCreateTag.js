import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Header, InputText, Icon, KeyboardHandleView } from './'
import { colors, constants, configs, styleApp } from '../configs'
import { array, string } from '../assets'

class ModalCreateTag extends Component {

    static propTypes = {
        onHide: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            name: '',
            arrColor: array.color,
            selectColor: 0
        }
    }

    _renderheader = () => {
        return <Header title='Create Tag' />
    }

    _renderPreview = () => {
        let { name, selectColor, arrColor } = this.state
        return <Button
            title={name.length === 0 ? string.tag : `#${name}`}
            backgroundColor={arrColor[selectColor]}
            style={{ alignSelf: 'center', marginTop: constants.padVer }}
        />
    }

    _renderName = () => {
        let { name } = this.state
        return <InputText
            autoFocus
            maxLength={configs.max_input_tag}
            hint={string.title}
            hintTop
            multiline={true}
            defaultValue={name}
            onChangeText={(value) => { this.setState({ name: value }) }} />
    }

    _renderColor = (v, i) => {
        let { selectColor } = this.state
        return <TouchableOpacity
            key={i}
            activeOpacity={constants.opacity}
            onPress={() => this.setState({ selectColor: i })}
            style={[{
                ...styleApp.shadow,
                backgroundColor: v,
                alignSelf: 'center'
            }, selectColor === i ? styles.borderSelectColor : null,
            styles.containersColor]}
        >
            {selectColor === i
                ? <Icon name='ios-checkmark-outline' />
                : null}
        </TouchableOpacity>
    }

    _renderSelectColor = () => {
        let { arrColor } = this.state
        return <View style={styles.containersArrColor}>
            {arrColor.map(this._renderColor)}
        </View>
    }

    _renderControl = () => {
        return <View
            style={styles.containersControl}
        >
            <Button
                title={string.ok}
                onPress={() => this.hide(true)}
                width={constants.appWidth / 3} />
            <Button
                title={string.canner}
                onPress={() => this.hide(false)}
                width={constants.appWidth / 3} />
        </View>
    }

    _renderContent = () => {
        return <View
            style={styles.containers}
        >
            {this._renderheader()}
            {this._renderPreview()}
            {this._renderName()}
            {this._renderSelectColor()}
            {this._renderControl()}

        </View >
    }

    render() {
        let { visible } = this.state
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => { }}
            >
                <View
                    style={styles.containersModal}>
                    {this._renderContent()}
                </View>
                <KeyboardHandleView />
            </Modal>
        )
    }

    show = (param) => {
        this.setState({
            visible: true,
            name: param.name
        })
    }

    hide = (type) => {
        let { onHide } = this.props
        let { name, selectColor, arrColor } = this.state
        this.setState({
            visible: false,
        },
            () => {
                onHide && onHide({ name: name, color: arrColor[selectColor], add: type })
            }
        )
    }
}

let styles = StyleSheet.create({
    containersModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containers: {
        backgroundColor: 'white',
        width: constants.appWidth,
        paddingBottom: constants.padVer,
        ...styleApp.shadow
    },
    containersLeft: {
        flexDirection: 'row'
    },
    containersArrColor: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    containersColor: {
        marginHorizontal: constants.padHor,
        marginVertical: constants.padVer,
        width: constants.icon,
        height: constants.icon,
        borderRadius: constants.icon / 2
    },
    containersControl: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: constants.padVer
    },
    borderSelectColor: {
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.5)'
    }
})

export default ModalCreateTag