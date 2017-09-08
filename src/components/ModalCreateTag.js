import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Header, InputText, Icon } from './'
import { colors, constants, configs } from '../configs'
import { array, string } from '../assets'

class ModalCreateTag extends Component {

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
                backgroundColor: v,
            }, selectColor === i ? styles.borderSelectColor : null,
            styles.constantColor]}
        >
            {selectColor === i
                ? <Icon name='ios-checkmark-outline' />
                : null}
        </TouchableOpacity>
    }

    _renderSelectColor = () => {
        let { arrColor } = this.state
        return <View style={styles.constantArrColor}>
            {arrColor.map(this._renderColor)}
        </View>
    }

    _renderControl = () => {
        return <View
            style={styles.constantControl}
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
            style={styles.constant}
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
                    style={styles.constantModal}>
                    {this._renderContent()}
                </View>
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
    constantModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    constant: {
        backgroundColor: 'white',
        width: constants.appWidth,
        padding: 12
    },
    constantLeft: {
        flexDirection: 'row'
    },
    constantArrColor: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    constantColor: {
        marginHorizontal: constants.padHor,
        marginVertical: constants.padVer,
        width: constants.icon,
        height: constants.icon,
        borderRadius: constants.icon / 2
    },
    constantControl: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: constants.padVer
    },
    borderSelectColor: {
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.5)'
    }
})

ModalCreateTag.propTypes = {
    title: PropTypes.string,
}

ModalCreateTag.defaultProps = {
    style: styles.constant,
    border: true,
    backgroundColor: colors.white
}


export default ModalCreateTag