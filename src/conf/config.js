export const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_BASE_URL),
  
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteApiKey:String(import.meta.env.VITE_APPWRITE_API_KEY),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  
    appwriteCollection:{
      categories: String(import.meta.env.VITE_APPWRITE_COLLECTION_CATEGORIES),
      subcategories: String(import.meta.env.VITE_APPWRITE_COLLECTION_SUB_CATEGORIES),
      transactions: String(import.meta.env.VITE_APPWRITE_COLLECTION_TRANSACTIONS),
      paymentModes: String(import.meta.env.VITE_APPWRITE_COLLECTION_PAYMENT_MODES),
    }
  };
  
  export default config;
  