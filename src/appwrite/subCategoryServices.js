import config from "../conf/config";
import { Client, Databases } from "appwrite";

export class subCategoryServices {
  client = new Client();
  database;
  constructor() {
    this.client.setEndpoint(config.appwriteUrl);
    this.client.setProject(config.appwriteProjectId);

    this.database = new Databases(this.client);
    console.log("subCategoryServices initialized");
  }

  async getAllSubCategories() {
    console.log("getSubCategories called");
    let subCategories = [];
    try {
      subCategories = await this.database.listDocuments(
       config.appwriteDatabaseId,config.appwriteCollection.subcategories
      );
    } catch (error) {
      console.log(error);
    }
    return subCategories;
  }
}

const subCategoryService = new subCategoryServices();
export default subCategoryService;