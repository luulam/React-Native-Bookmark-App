import React from 'react'
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native'
import { colors, constants } from '../configs/theme'

/**
 * 
 * @param ellipsizeMode {'head','middle','tail'} 
 * @return <Text/>
 */

let TextApp = ({
    text,
    bold,
    italic,
    style,
    disable,
    color,
    fontSize,
    ellipsizeMode,
    numberOfLines,
    children,
    onPress,
    key
}) => {
    return <Text
        onPress={onPress}
        key={key}
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        style={[{
            color: disable ? colors.disable : color,
            fontSize,
            fontWeight: bold ? 'bold' : undefined,
            fontStyle: italic ? 'italic' : undefined
        }, style]}
    >
        {text}
        {children}
    </Text>
}

let styles = StyleSheet.create({
    constant: {
        alignSelf: 'flex-start',
    }
})

TextApp.propTypes = {
    text: PropTypes.string,
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    disable: PropTypes.bool,
    color: PropTypes.string,
    fontSize: PropTypes.number
}

TextApp.defaultProps = {
    color: colors.text,
    fontSize: constants.font.nomal,
    numberOfLines: undefined,
    ellipsizeMode: 'tail',
    style: styles.constant
}

export default TextApp