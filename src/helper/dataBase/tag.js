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

const add = ({
    name,
    color = '#000000',
    timeCreate = new Date().toString(),
    timeUpdate = new Date().toString()
 }) => {

    try {
        if (!name) throw `name is require`

        let arrTag = get().sorted('id');
        if (arrTag.filter(v => v.name === name).length !== 0) throw `name is already exists `

        let id = arrTag.length !== 0 ? arrTag[arrTag.length - 1]['id'] + 1 : 1;
        let object
        Realm.write(() => {
            object = Realm.create('Tag', { id, name, color, timeCreate, timeUpdate });
        });

        return object
    } catch (e) {
        console.log('TAG add ', e)
    }
}

const addAll = (arr) => new Promise((resolve, reject) => {
    try {
        arr.forEach((element) => {
            add({ name: element.name, color: element.color })
        });
        resolve(arr)
    } catch (e) {
        reject(e)
        console.error(e)
    }
})

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
    remove,
    removeAll,
    add,
    addAll
}