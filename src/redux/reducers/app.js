import {
    ADD_NOTIFY,
    REMOVE_NOTIFY,
    HIDE_DIALOG,
    SHOW_DIALOG
} from '../actions/app'


const INITIAL = {
    notifys: [],
    dialog: {
        title: '',
        message: '',
        button: [],
        show: false
    }
};

export default (state = INITIAL, action) => {
    switch (action.type) {

        case ADD_NOTIFY:
            return Object.assign({}, state, {
                notifys: state.notifys.concat({
                    id: action['id'],
                    title: action['title']
                })
            })

        case REMOVE_NOTIFY:
            let indexToast = state.notifys.findIndex(value => value['id'] === action['id'])
            return Object.assign({}, state, {
                notifys: [...state.notifys.slice(0, indexToast), ...state.notifys.slice(indexToast + 1)]
            })

        case SHOW_DIALOG:
            return Object.assign({}, state, {
                dialog: {
                    title: action['title'],
                    message: action['message'],
                    button: action['button'] || [],
                    show: true
                }
            })

        case HIDE_DIALOG:
            return Object.assign({}, state, {
                dialog: {
                    title: '',
                    message: '',
                    button: [],
                    show: false
                }
            })
            
        default:
            return state;
    }
}