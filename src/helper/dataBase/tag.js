import Realm from '../../configs/realm'

/**
 * nameSchema Tag
 * { type: 'int' } id
 * { type: 'string' } name
 * { type: 'string', default: '#ffffff' } color
 */

const get = () => {
    return Realm.objects('Tag');
}

const add = ({ name, color = '#000' }) => {
    if (!name) console.warn(`name is require`);
    try {
        Realm.write(() => {
            let arrTag = get().sorted('id');
            let id = arrTag.length !== 0 ? arrTag[arrTag.length - 1]['id'] : 1;
            Realm.create('Tag', { id: id + 1, name, color });
        });
    } catch (e) {
        console.error(e)
    }
}

const remove = (index) => {
    try {
        Realm.write(() => {
            Realm.delete(get().filtered(`id = ${index}`))
        })
    } catch (e) {
        console.error('remove', e)
    }
}
const removeAll = () => {
    try {
        Realm.write(() => {
            Realm.delete(get())
        })
    } catch (e) {
        console.error('error', e)
    }
}

export default {
    get,
    add,
    remove,
    removeAll
}
