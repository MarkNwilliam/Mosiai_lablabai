import { Client, Account, ID, Databases, Storage } from 'appwrite';



const appwrite = new Client();

appwrite.setEndpoint("https://cloud.appwrite.io/v1").setProject("646b0381df62ed4b1301");

const account = new Account(appwrite)
const databases = new Databases(appwrite);
const storage = new Storage(appwrite);
export { appwrite, account, ID, databases , storage};


