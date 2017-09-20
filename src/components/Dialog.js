import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text, Button, KeyboardHandleView } from './'
import { colors, constants } from '../configs'


class Dialog extends Component {

    static propTypes = {
        dialog: PropTypes.object,
    }

    static defaultProps = {
        dialog: {
            title: '',
            message: '',
            button: [],
            show: true
        }
    }

    _renderButton = () => {
        let { dialog } = this.props
        return (<View style={styles.containersButton}>
            {dialog.button.map((v, i) => <Button
                key={i}
                width={constants.appWidth / 3}
                title={v.title}
                onPress={v.onPress}
            />)}
        </View>)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.dialog && nextProps.dialog.show) {
            Keyboard.dismiss()
        }
        return true
    }

    render() {
        let { dialog } = this.props

        return dialog.show
            ? <View
                style={styles.containers}
            >
                <View
                    style={styles.containersBackground}>
                    <Text
                        text={dialog.title}
                        bold
                        style={styles.text}
                        fontSize={constants.font.dialog} />
                    <Text
                        text={dialog.message}
                        style={styles.text}
                        fontSize={constants.font.dialog} />

                    {this._renderButton()}

                </View>
                <KeyboardHandleView />
            </View>
            : null

    }
}

const styles = StyleSheet.create({
    containers: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    containersBackground: {
        backgroundColor: 'white',
        padding: constants.padHor * 3,
        borderRadius: constants.borderRadius
    },
    containersButton: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        marginBottom: constants.padHor * 3,
        alignSelf: 'center'
    }
})


const mapStateToProps = (state, ownProps) => {
    return {
        dialog: state.app.dialog,
    }
}

export default connect(mapStateToProps)(Dialog)
