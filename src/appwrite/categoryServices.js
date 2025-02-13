import config from "../conf/config";
import { Client, Databases } from "appwrite";

export class CategoryServices {
    client = new Client();
    database;
    constructor() {
        this.client.setEndpoint(config.appwriteUrl);
        this.client.setProject(config.appwriteProjectId);
        
        this.database = new Databases(this.client);
        console.log("CategoryServices initialized");
    }
   
    async getAllCategories() {
        console.log("getCategories called");
        let categories = [];
        try {
            categories = await this.database.listDocuments(config.appwriteDatabaseId,config.appwriteCollection.categories)
            
        } catch (error) {
            console.log(error);
        }
        return categories;        
    }
}

const categoryService = new CategoryServices();
export default categoryService;

