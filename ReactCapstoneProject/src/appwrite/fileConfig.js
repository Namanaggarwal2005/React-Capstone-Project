import config from "../config/config";
import { Client, Account, Storage, ID} from "appwrite";

class FileService {
    client = new Client();
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID);
        this.storage = new Storage(client);
    }

    async uploadFile(file){
        // it will return the file id only
        try{
            const result = await storage.createFile({
                    bucketId:config.appwriteBucketID,
                    fileId: ID.unique(),
                    file: file
            });
            return result;
        }catch(e){
            console.log(`Error occured in fileService methods ${e}`)
            return false;
        }
        
    }

    async deleteFile(fileId){
        try{
            const result = await storage.deleteFile({
                bucketId: config.appwriteBucketID,
                fileId: fileId
            });
        }catch(e){
            console.log(`Error occured in fileService methods ${e}`)
            return false;
        }
    }

    getFilePreview(fileID){
        try{
            const result = storage.getFilePreview({
                bucketId: config.appwriteBucketID,
                fileId: fileID
            });

            return result;
        }catch(e){
            console.log(`Error occured in fileService methods ${e}`)
            return false;
        }

    }
}

const fileService = new FileService();

export default fileService;