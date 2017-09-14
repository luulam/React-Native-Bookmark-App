import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text } from './'
import { colors, constants, styleApp } from '../configs'


class Notify extends Component {
    static propTypes = {
        notifys: PropTypes.array,
    }

    static defaultProps = {
        notifys: []
    }

    _renderNotify = (v, i) => {
        return (
            <View
                style={styles.border}
                key={i}>
                <Text
                    color={colors.text_light}
                    text={v['title']} />
            </View>
        )
    }
    render() {
        let { notifys } = this.props
        return (
            <View style={styles.constant}>
                {this.props.notifys.map(this._renderNotify)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constant: {
        bottom: constants.padVer * 2,
        left: 0,
        right: 0,
        justifyContent: 'center',
        position: 'absolute',
    },
    border: {
        backgroundColor: colors.access,
        padding: constants.pad,
        marginBottom: constants.padVer,
        marginHorizontal: constants.padHor * 2,
        height: constants.btnHeight,
        borderRadius: constants.btnHeight / 2,
        alignItems: 'center',
        justifyContent: 'center',
        ...styleApp.shadow
    },
    text: {
        color: colors.text_light
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        notifys: state.app.notifys,
    }
}

export default connect(mapStateToProps)(Notify)
