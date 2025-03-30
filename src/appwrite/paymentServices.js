import config from "../conf/config";
import { Client, Databases,ID } from "appwrite";

export class PaymentServices {
  client = new Client();
  database;
  constructor() {
    this.client.setEndpoint(config.appwriteUrl);
    this.client.setProject(config.appwriteProjectId);

    this.database = new Databases(this.client);
    console.log("PaymentServices initialized");
  }
  async AddPaymentMode({paymentMode:name}){
    console.log("AddPaymentMode called");
    
    try {
        const response = await this.database.createDocument(
          config.appwriteDatabaseId,
          config.appwriteCollection.paymentModes,
          ID.unique(),
          {
            name: name,
          }
        );
        console.log("Payment mode added successfully");
        console.log(response);
        return response;
    } catch (error) {
      console.log(error);
    }
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
