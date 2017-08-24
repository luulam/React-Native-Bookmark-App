import { Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

const colors = {
    primary: '#edbbd0',
    secondary: '#B3D9CE',
    bg_app: '#F7F7F7',
    access: '#191919',
    text: '#191919',
    disable: '#cccccc',
    green: '#00551e',
    brown: '#693504',
    red: '#db2828'
}

const constants = {
    appWidth: width < height ? width : height,
    appHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 48 : 48,
    statusBarHeight: Platform.OS === 'ios' ? 22 : 22,
    padHor: 8,
    padVer: 4,
    pad: 4,
    opacity: 0.6,
    font: {
        nomal: 16,
        header: 24,
    },
    icon: 38,
    btnHeight:38,
}

export {
    colors, constants
}

export default {
    colors, constants
}