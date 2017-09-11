import Realm from 'realm'

/**
 * @dateCreate: moment('LLL')
 * 
 */

let TagSchema = {
    name: 'Tag',
    primaryKey: 'id',
    properties: {
        id: { type: 'int' },
        name: { type: 'string' },
        color: { type: 'string', default: '#ffffff' },
        timeCreate: { type: 'string' },
        timeUpdate: { type: 'string' },
    }
};

let BookmarkSchema = {
    name: 'Bookmark',
    primaryKey: 'id',
    properties: {
        id: { type: 'int' },
        title: { type: 'string' },
        content: { type: 'string' },
        hide: { type: 'bool' },
        tags: { type: 'list', objectType: 'Tag' },
        timeCreate: { type: 'string' },
        timeUpdate: { type: 'string' },
    }
};

export default new Realm({
    path: Realm.defaultPath,
    schemaVersion: Realm.schemaVersion(Realm.defaultPath),
    schema: [TagSchema, BookmarkSchema]
})