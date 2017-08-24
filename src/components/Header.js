import React from 'react'
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native'
import { Text } from './'
import { colors, constants } from '../configs/theme'

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
            style={[style]}>
            <Text
                text={title}
                fontSize={constants.font.header}
                bold />
            <View
                style={styles.constantLeft}>
                {children}
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    constant: {
        paddingHorizontal: constants.padHor,
        height: constants.navBarHeight,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    constantLeft: {
        flexDirection: 'row'
    }
})

HeaderApp.propTypes = {
    title: PropTypes.string,
}

HeaderApp.defaultProps = {
    style: styles.constant
}


export default HeaderApp