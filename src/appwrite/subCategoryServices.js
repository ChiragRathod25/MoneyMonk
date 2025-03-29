import config from "../conf/config";
import { Client, Databases,ID, Query } from "appwrite";

export class subCategoryServices {
  client = new Client();
  database;
  constructor() {
    this.client.setEndpoint(config.appwriteUrl);
    this.client.setProject(config.appwriteProjectId);

    this.database = new Databases(this.client);
    console.log("subCategoryServices initialized");
  }

  async addSubCategory({ subcategoryName, categoryId }) {
    console.log("addSubCategory called",  subcategoryName, categoryId);
    try {
      const response = await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollection.subcategories,
        ID.unique(),
        { name: subcategoryName, categoryId: categoryId }
      );
      return response;
    } catch (error) {
      console.error("Error adding subcategory:", error);
      throw error;
    }
  }

  async getAllSubCategories() {
    console.log("getSubCategories called");
    let subCategories = [];
    try {
      subCategories = await this.database.listDocuments(
       config.appwriteDatabaseId,config.appwriteCollection.subcategories,
       [Query.limit(100)]
      );
    } catch (error) {
      console.log(error);
    }
    return subCategories;
  }
}

const subCategoryService = new subCategoryServices();
export default subCategoryService;