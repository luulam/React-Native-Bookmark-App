import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { Button, Text } from './'
import { constants } from '../configs'
import { string } from '../assets'
import actions from '../redux/actions'
import { Tag } from '../helper'

class ListTags extends Component {

    static propTypes = {
        data: PropTypes.any,
        onPress: PropTypes.func,
        isSeeAll: PropTypes.bool
    }

    _renderTag = (v, i) => {
        return <View
            key={i}
            style={styles.padding}>
            <Button title={v.name}
                onLongPress={() => this.onLongPress(v)}
                backgroundColor={v.color}
                onPress={() => this.onclickTag(v, i)} />
        </View>
    }

    _renderListTags = () => {
        let { data, onPress, isSeeAll } = this.props
        return (
            <View style={styles.listTags}>
                {data.map(this._renderTag)}
                {isSeeAll
                    ? <Text
                        onPress={() => onPress && onPress(undefined, undefined)}
                        text={string.see_all}
                        style={styles.textAll}
                    />
                    : null}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.containers}>
                <Text
                    text={string.name_listtags}
                    bold
                    under
                    italic
                    style={styles.name} />
                {this._renderListTags()}
            </View >
        )
    }

    onLongPress = (v) => {
        this.props.showDialog(string.warning, string.remove_tag, [
            {
                title: string.ok, onPress: () => {
                    Tag.remove(v.id)
                    this.props.hideDialog();
                    this.props.showNotify(string.remove_tag_success)
                }
            },
            { title: string.canner, onPress: () => this.props.hideDialog() }
        ])
    }

    onclickTag = (v, i) => {
        let { onPress } = this.props
        onPress && onPress(v, i)
    }
}

const styles = StyleSheet.create({
    containers: {
        marginVertical: constants.padVer,
    },
    listTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textAll: {
        alignSelf: 'center',
        paddingLeft: constants.padHor
    },
    padding: {
        paddingVertical: constants.padVer,
        paddingLeft: constants.padHor
    },
    name: {
        paddingLeft: constants.padHor * 2,
        paddingBottom: constants.padVer
    }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    showNotify: (data) => actions.showNotify(dispatch)(data),
    showDialog: (title, message, button) => actions.showDialog(dispatch)(title, message, button),
    hideDialog: () => actions.hideDialog(dispatch)
})

export default connect(null, mapDispatchToProps, null, { withRef: true })(ListTags)
