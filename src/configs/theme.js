import { Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

const color = {
    primary: '#edbbd0',
    secondary: '#B3D9CE',
    bg_app: '#F7F7F7',
    access: 'white',
    text: '#2b2b2b',
    green: '#00551e',
    brown: '#693504',
    red: '#db2828'
}

const constant = {
    appWidth: width < height ? width : height,
    appHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    statusBarHeight: Platform.OS === 'ios' ? 22 : 22,
}

export default {
    color, constant
}