import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { colors, constants } from '../configs'
import { Text, Icon } from './'

export default class InputText extends Component {

    static defaultProps = {
        multiline: false
    }

    constructor(props) {
        super(props)
        this.state = {
            value: this.props.defaultValue || ''
        }
    }

    _renderHint = () => {
        let { hint, maxLength } = this.props;
        let { value } = this.state;
        return value.length > 0
            ? <View style={styles.constantHint}>
                <Text
                    text={hint}
                    color={colors.access}
                    fontSize={constants.font.sub}
                />
                {maxLength
                    ? <Text
                        color={colors.access}
                        fontSize={constants.font.sub}
                        text={`${value.length}/${maxLength}`} />
                    : null}
            </View>
            : null
    }

    _renderRemoveAll = () => {
        let { value } = this.state
        return value.length > 0
            ? <View
                style={[styles.removeAll,
                { top: this.props.hintTop ? constants.font.sub + constants.padVer : 0 }]}>
                <Icon
                    onPress={() => this._handRemoveAllText()}
                    size={constants.font.nomal}
                    name='ios-close-circle-outline'
                />
            </View>
            : null
    }

    render() {
        const {
            hint,
            multiline,
            style,
            autoFocus,
            hintTop,
            styleConstant,
            maxLength
        } = this.props
        const { value } = this.state
        return (
            <View
                style={[styles.constant, styleConstant]}
            >
                {hintTop ? this._renderHint() : null}
                <TextInput
                    maxLength={maxLength}
                    autoFocus={autoFocus}
                    placeholder={hint}
                    blurOnSubmit={true}
                    multiline={multiline}
                    underlineColorAndroid='transparent'
                    onChangeText={this._onChangeText}
                    value={value}
                    style={{
                        fontSize: constants.font.nomal,
                        ...style
                    }}
                />
                {this._renderRemoveAll()}
            </View>
        )
    }

    /**
     * {string} @return 'curent text '
     */
    text = () => {
        return this.state.value
    }

    _handRemoveAllText = () => {
        this.setState({ value: '' });
        this.props.onChangeText && this.props.onChangeText('');
    }

    _onChangeText = (text) => {
        this.setState({ value: text });
        this.props.onChangeText && this.props.onChangeText(text);
    }
}

const styles = StyleSheet.create({
    constant: {
        paddingHorizontal: constants.padHor,
        paddingVertical: constants.padVer,
    },
    constantHint: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    removeAll: {
        position: 'absolute',
        right: constants.padHor,
        bottom: 0,
        justifyContent: 'center'
    }
})