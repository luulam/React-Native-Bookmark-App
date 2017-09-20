import React from 'react'
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native'
import { Text } from './'
import { colors, constants, styleApp } from '../configs'

/**
 * 
 * @param 
 * @return <View/>
 */

let HeaderApp = ({
    style,
    title,
    children
}) => {
    return (
        <View
            style={style}
        >
            {title
                ? <Text
                    align='center'
                    text={title}
                    fontSize={constants.font.header}
                    bold
                />
                : null}
            <View
                style={styles.containersLeft}
            >
                {children}
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    containers: {
        paddingTop: constants.statusBarHeight,
        backgroundColor: colors.header,
        paddingHorizontal: constants.padHor,
        marginBottom: constants.padHor,
        height: constants.navBarHeight + constants.statusBarHeigh,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...styleApp.shadow
    },
    containersLeft: {
        flexDirection: 'row'
    }
})

HeaderApp.propTypes = {
    title: PropTypes.string,
}

HeaderApp.defaultProps = {
    style: styles.containers
}


export default HeaderApp