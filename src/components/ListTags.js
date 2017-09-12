import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native'
import { Button, Text } from './'
import { constants } from '../configs'
import { string } from '../assets'
import Realm from '../configs/realm'

/**
 * @param {arr realm resuft} data 
 * @param {func} onPress
 */

export default class ListTags extends Component {
    static propTypes = {
        data: PropTypes.any,
        onPress: PropTypes.func
    }

    renderTag = (v, i) => {
        return <View
            key={i}
            style={styles.padding}>
            <Button title={v.name}
                backgroundColor={v.color}
                onPress={() => this.onclickTag(v, i)} />
        </View>
    }

    renderListTags = () => {
        let { data } = this.props
        return (
            <View style={styles.listTags}>
                {data.map(this.renderTag)}
                <Text
                    text={string.see_all}
                    style={styles.textAll} />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.constant}>
                <Text
                    text={string.name_listtags}
                    bold
                    under
                    italic
                    style={styles.name} />
                {this.renderListTags()}
            </View >

        )
    }

    onclickTag = (v, i) => {
        let { onPress } = this.props
        onPress && onPress(v, i)
    }
}

const styles = StyleSheet.create({
    constant: {
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