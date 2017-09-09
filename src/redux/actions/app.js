import { configs } from '../../configs'

import uuidV4 from 'uuid/v4'

export const ADD_NOTIFY = 'ADD_NOTIFY'
export const REMOVE_NOTIFY = 'REMOVE_NOTIFY'

addNotify = (id, title) => ({
    type: ADD_NOTIFY,
    id: id,
    title: title,
})

hideNotify = id => ({
    type: REMOVE_NOTIFY,
    id: id,
})

export const showNotify
    = dispatch => (title, timeout) => {
        let id = uuidV4()
        dispatch(addNotify(id, title))
        setTimeout(function () {
            dispatch(hideNotify(id))
        }, timeout ? timeout : configs.time_show_notify);
    }

