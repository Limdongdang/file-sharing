// file.service.js
import { File } from "../model/file.model.js";

const getFiles = async () => {
    const files = await File.findAll();
    return files;
}
        
export default { getFiles };