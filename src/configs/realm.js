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
    }
};

let BookmarkSchema = {
    name: 'Bookmark',
    primaryKey: 'id',
    properties: {
        id: { type: 'int' },
        name: { type: 'string' },
        content: { type: 'string' },
        hide: { type: 'bool' },
        dateCreate: { type: 'string' },
        tags: { type: 'list', objectType: 'Tag' }
    }
};

export default new Realm({ schema: [TagSchema, BookmarkSchema] })