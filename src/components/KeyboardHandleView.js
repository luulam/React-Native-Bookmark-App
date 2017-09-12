import React, { Component } from 'react';
import { Keyboard, View, Platform } from 'react-native';

export default class KeyboardHandleView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            heightKeyBoard: 0
        }
    }
    componentWillMount() {
        const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

        this._listeners = [
            Keyboard.addListener(updateListener, this._keyboardDidShow),
            Keyboard.addListener(resetListener, this._keyboardDidHide)
        ];
    }

    render() {
        let { heightKeyBoard, style } = this.state
        return (
            <View
                style={[{
                    height: Platform.OS === 'ios' ? heightKeyBoard : 0,
                }, style]}
            />
        );
    }
    componentWillUnmount = () => {
        this._listeners.forEach(listener => listener.remove());
    }

    _keyboardDidShow = (event) => {
        this.setState({ heightKeyBoard: event.endCoordinates.height })
    }

    _keyboardDidHide = (event) => {
        this.setState({ heightKeyBoard: 0 })
    }
}