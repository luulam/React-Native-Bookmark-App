import React from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native'
import { colors, constants } from '../configs/theme'
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
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={constants.opacity}
            onPress={onPress}
            style={style}>
            <Icon
                name={name}
                size={size}
                color={color} />
        </TouchableOpacity>
    )
}

let styles = StyleSheet.create({
    constant: {
        marginHorizontal: constants.padHor
    }
})

IconApp.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    onPress: PropTypes.func,
}

IconApp.defaultProps = {
    style: styles.constant,
    name: 'ios-bug-outline',
    size: constants.icon,
    color: colors.access
}

export default IconApp