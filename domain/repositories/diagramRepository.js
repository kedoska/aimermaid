export default (storage) => {

    return {
        getDiagramFilePath: async (id) => {
            return await storage.getPathById(id);
        },
        saveDiagramToFile: async (id, content) => {
            await storage.set(id, content);
        }
    }
}