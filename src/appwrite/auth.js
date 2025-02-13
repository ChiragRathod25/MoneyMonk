/* eslint-disable no-useless-catch */
import  config  from "../conf/config";
import { Account, Client, ID } from "appwrite";

export class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(config.appwriteUrl);
    this.client.setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createNewUser({email,password,name}) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.account.create(ID.unique(), email, password,name);
      if (response) {
        return this.login({ email, password });
      } else {
        return response;
      }
    } catch (error) {
      console.error(`Appwrite auth serive :: createNewUser :: error`,error)
      throw error;
    }
  }
  async login({email,password}){
    // eslint-disable-next-line no-useless-catch
    try {
        const response=await this.account.createEmailPasswordSession(email,password)
        return response
    } catch (error) {
        throw error
    }
  }
  async logout(){
    // eslint-disable-next-line no-useless-catch
    try {
        return await this.account.deleteSession('current')
    } catch (error) {
        throw error
    }
  }
  async getCurrentUser(){
    try {
        return await this.account.get()
    } catch (error) {
        throw error
    }
  }
}
const authService=new AuthServices()
export default authService
