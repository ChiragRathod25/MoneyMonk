import config from "../conf/config";
import { Client, ID, Databases, Query, Permission, Role } from "appwrite";

export class TransactionServices {
  client = new Client();
  database;
  constructor() {
    this.client.setEndpoint(config.appwriteUrl);
    this.client.setProject(config.appwriteProjectId);

    this.database = new Databases(this.client);
    console.log("TransactionServices initialized");
  }
  async createTrasanction(data, userId) {
    if (!userId) {
      console.log("userId is not defined");
      return;
    }

    console.log("createTrasanction called");
    data.userId = userId;
    console.log(data);
    return this.database.createDocument(
      config.appwriteDatabaseId,
      config.appwriteCollection.transactions,
      ID.unique(),
      data
    );
  }
  async getUserTransactions({ userId }) {
    console.log("getUserTransactions called");
    return this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollection.transactions,
      [
        Query.limit(50),
        Query.orderDesc("$createdAt"),
        Query.equal("userId", userId),
      ]
    );
  }
  async getTransactionById(id) {
    console.log("getTransactionById called");
    return this.database.getDocument(
      config.appwriteDatabaseId,
      config.appwriteCollection.transactions,
      id
    );
  }
  async updateTransaction(id, data) {
    console.log("updateTransaction called");
    return this.database.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteCollection.transactions,
      id,
      data
    );
  }
  async deleteTransaction(id) {
    console.log("deleteTransaction called");
    return this.database.deleteDocument(
      config.appwriteDatabaseId,
      config.appwriteCollection.transactions,
      id
    );
  }
}

const transactionService = new TransactionServices();
export default transactionService;
