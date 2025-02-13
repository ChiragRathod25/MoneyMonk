import config from "../conf/config";
import { Client, ID,Databases } from "appwrite";

export class TransactionServices {
  client = new Client();
  database;
  constructor() {
    this.client.setEndpoint(config.appwriteUrl);
    this.client.setProject(config.appwriteProjectId);

    this.database = new Databases(this.client);
    console.log("TransactionServices initialized");
  }
  async createTrasanction(data) {
    console.log("createTrasanction called");
    console.log(data);
    return this.database.createDocument(config.appwriteDatabaseId,config.appwriteCollection.transactions,ID.unique(),data);

  }
}

const transactionService = new TransactionServices();
export default transactionService;
