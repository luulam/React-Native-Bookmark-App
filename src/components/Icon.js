import React from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native'
import { colors, constants } from '../configs'
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * 
 * @return <Text/>
 */

let IconApp = ({
    style,
    name,
    size,
    color,
    onPress,
    margin
}) => {
    return (
        <TouchableOpacity
            activeOpacity={constants.opacity}
            onPress={onPress}
            style={[style, {
                marginHorizontal: margin ? constants.padHor : undefined
            }]}>
            <Icon
                style={styles.icon}
                name={name}
                size={size}
                color={color} />
        </TouchableOpacity>
    )
}

let styles = StyleSheet.create({
    containers: {
        backgroundColor: 'transparent'
    },
    icon: {
        backgroundColor: 'transparent',
        textAlign: 'center'
    }
})

IconApp.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    onPress: PropTypes.func,
}

IconApp.defaultProps = {
    style: styles.containers,
    name: 'ios-bug-outline',
    size: constants.icon,
    color: colors.text
}

export default IconApp