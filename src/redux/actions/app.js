import { configs } from '../../configs'

import uuidV4 from 'uuid/v4'

export const ADD_NOTIFY = 'ADD_NOTIFY'
export const REMOVE_NOTIFY = 'REMOVE_NOTIFY'
export const SHOW_DIALOG = 'SHOW_DIALOG'
export const HIDE_DIALOG = 'HIDE_DIALOG'

addNotify = (id, title) => ({
    type: ADD_NOTIFY,
    id: id,
    title: title,
})

hideNotify = id => ({
    type: REMOVE_NOTIFY,
    id: id,
})

export const showNotify = dispatch => (title, timeout) => {
    let id = uuidV4()
    dispatch(addNotify(id, title))
    setTimeout(function () {
        dispatch(hideNotify(id))
    }, timeout ? timeout : configs.time_show_notify);
}

export const showDialog = dispatch => (title, message, button) => {
    dispatch({
        type: SHOW_DIALOG,
        title,
        message,
        button
    })
}

export const hideDialog = dispatch => {
    dispatch({
        type: HIDE_DIALOG,
    })
}
