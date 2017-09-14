
import Realm from '../../configs/realm'

/**
 * nameSchema Bookmark
 * id: { type: 'int' },
 * title: { type: 'string' },
 * content: { type: 'string' },
 * hide: { type: 'bool' },
 * tags: { type: 'data', objectType: 'Tag' },
 * timeCreate: { type: 'string' },
 * timeUpdate: { type: 'string' },
 */

import Tag from './tag'

const get = () => {
    return Realm.objects('Bookmark');
}

const add = ({
    title = '',
    content,
    hide = false,
    tags = [],
    timeCreate = new Date().toString(),
    timeUpdate = new Date().toString()
}) => {
    try {
        if (!content) throw 'Error : content is requi';
        else Realm.write(() => {
            //create fied id 
            let arr = get().sorted('id');
            let id = arr.length !== 0
                ? arr[arr.length - 1]['id'] + 1
                : 1;
            //create Bookmark
            Realm.create('Bookmark', {
                id: id,
                title,
                content,
                hide,
                tags,
                timeCreate,
                timeUpdate
            });
        });

    } catch (e) {
        console.log(e)
    }
}

const addAll = (arr) => new Promise((resolve, reject) => {
    try {
        arr.forEach((element) => {
            add({
                title: element.title,
                content: element.content,
                hide: element.hide,
                tags: element.tags,
                timeCreate: element.timeCreate,
                timeUpdate: element.timeUpdate
            })
        })
        resolve(arr)
    } catch (e) {
        reject(e)
        console.log(e)
    }
})

const edit = (resuft, { title, content, hide, tags }) => {
    try {
        Realm.write(() => {
            resuft.title = title || resuft.title
            resuft.content = content || resuft.content
            resuft.hide = hide || resuft.hide
            resuft.timeUpdate = new Date().toString()
            if (tags) {
                resuft.tags.forEach(v => {
                    resuft.tags.pop()
                })
                tags.forEach((tag) => {
                    resuft.tags.push(tag)
                })
            }
        })
    } catch (error) {
        console.log(e)
    }
}

const remove = (index) => {
    try {
        Realm.write(() => {
            Realm.delete(get().filtered(`id = ${index}`))
        })
    } catch (e) {
        console.log('remove', e)
    }
}

const removeAll = () => {
    try {
        Realm.write(() => {
            Realm.delete(get())
        })
    } catch (e) {
        console.log('error', e)
    }
}

export default {
    get,
    add,
    addAll,
    edit,
    remove,
    removeAll
}
