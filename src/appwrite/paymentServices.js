import config from "../conf/config";
import { Client, Databases } from "appwrite";

export class PaymentServices {
  client = new Client();
  database;
  constructor() {
    this.client.setEndpoint(config.appwriteUrl);
    this.client.setProject(config.appwriteProjectId);

    this.database = new Databases(this.client);
    console.log("PaymentServices initialized");
  }
  async getAllPaymentModes() {
    console.log("getAllPaymentModes called");
    let paymentModes = [];
    try {
      paymentModes = await this.database.listDocuments(config.appwriteDatabaseId,config.appwriteCollection.paymentModes)
      
    } catch (error) {
      console.log(error);
    }
    return paymentModes;
  }
}

const paymentService = new PaymentServices();
export default paymentService;
