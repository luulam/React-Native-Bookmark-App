import { ADD_NOTIFY, REMOVE_NOTIFY } from '../actions/app'

const INITIAL = {
    notifys: []
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
        default:
            return state;
    }
}