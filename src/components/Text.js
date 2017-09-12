import React from 'react'
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native'
import { colors, constants } from '../configs'

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
    align,
    ellipsizeMode,
    numberOfLines,
    children,
    onPress
}) => {
    return <Text
        onPress={onPress}
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        style={[style,{
            textAlign: align,
            color: disable ? colors.disable : color,
            fontSize,
            fontWeight: bold ? 'bold' : undefined,
            fontStyle: italic ? 'italic' : undefined
        }]}
    >
        {text}
        {children}
    </Text>
}

let styles = StyleSheet.create({
    constant: {
        // alignSelf: 'flex-start',
    }
})

TextApp.propTypes = {
    text: PropTypes.string,
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    disable: PropTypes.bool,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    align: PropTypes.string,
}

TextApp.defaultProps = {
    color: colors.text,
    fontSize: constants.font.nomal,
    numberOfLines: undefined,
    ellipsizeMode: 'tail',
    style: styles.constant,
    align: 'left'
}

export default TextApp