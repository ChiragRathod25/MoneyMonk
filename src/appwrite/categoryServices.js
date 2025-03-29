import config from "../conf/config";
import { Client, Databases,ID } from "appwrite";


export class CategoryServices {
    client = new Client();
    database;
    constructor() {
        this.client.setEndpoint(config.appwriteUrl);
        this.client.setProject(config.appwriteProjectId);
        
        this.database = new Databases(this.client);
        console.log("CategoryServices initialized");
    }
   
    async addCategory({categoryName,categoryType}) {
        console.log("addCategory called");
        try {
          
            //unique document Id should be given from the database
            const response = await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollection.categories,
                ID.unique(),
                { name: categoryName, type: categoryType }
            );
            return response;
        } catch (error) {
            console.error("Error adding category:", error);
            throw error;
        }
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

