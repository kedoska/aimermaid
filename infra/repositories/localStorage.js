import {readFile, writeFile} from 'fs/promises'

export default (settings = {}) => {

    const basePath = settings.basePath || process.cwd()
    const defaultExtension = settings.defaultExtension || 'mmd'

    const appendExtensionIfNotExists = (path) => {
        if (path.endsWith(`.${defaultExtension}`)) {
            return path
        }
        return `${path}.${defaultExtension}`
    }

    return {
        set: async (id, content) => await writeFile(appendExtensionIfNotExists(`${basePath}/${id}`), content),
        get: async (id) => await readFile(appendExtensionIfNotExists(`${basePath}/${id}`), 'utf-8'),
        getPathById: async (id) => appendExtensionIfNotExists(`${basePath}/${id}`),
    }
}