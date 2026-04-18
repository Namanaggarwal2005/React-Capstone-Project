import config from "../config/config";
import { Client, Account, ID, TablesDB, Query} from "appwrite";

class Service {
    client = new Client();
    tablesDB;

    constructor() {
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID);
        this.tablesDB = new TablesDB(client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            const result = await this.tablesDB.createRow({
            databaseId: config.appwriteDatabaseID,
            collectionId: config.appwriteCollectionID,
            rowId: slug,
            data: {
                    'title':title,
                    'content':content,
                    'featuredImage':featuredImage,
                    'status':status,
                    'userId':userId
                }
            });

            return result;
        }catch(exception){
            console.log(`Error occured while database making ${exception}`)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            const result = await tablesDB.updateRow({
                    databaseId: config.appwriteDatabaseID,
                    tableId: config.appwriteCollectionID,
                    rowId: slug,
                    data: {
                        'title':title,
                        'content':content,
                        'featuredImage':featuredImage,
                        'status':status,
                    }
            });
            return result;
        }catch(exception){
            console.log(`Error occured while database making ${exception}`)
        }
    }

    async deletePost(slug){
        try{
            const result = await tablesDB.deleteRow({
                databaseId:config.appwriteDatabaseID,
                tableId: config.appwriteCollectionID,
                rowId: slug,
            });
            return true;
        }catch(e){
            console.log(`Error in database methods ${e}`)
            return false;
        }
    }

    async getPost(slug){
        try{
            const result = await tablesDB.getRow({
                databaseId: config.appwriteDatabaseID,
                tableId: config.appwriteCollectionID,
                rowId: slug
            });
            return result;
        }catch(e){
            console.log(`Error in database methods ${e}`)
        }
    }

    async getPosts(){
        try{
            const result = await tablesDB.listRows({
                databaseId:config.appwriteDatabaseID,
                tableId: config.appwriteCollectionID,
                queries: [
                    Query.isNotNull("status"),
                    Query.equal('status',true)
                ]
            });

       }catch(e){
            console.log(`Error occured in database methods ${e}`)
       }
    }
}

const service = new Service();

export default service;
