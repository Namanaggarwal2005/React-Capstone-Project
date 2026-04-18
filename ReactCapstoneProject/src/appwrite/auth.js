import config from '../config/config';
import { Client, Account, ID } from "appwrite";

class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email: email,
                password:password,
                name:name
            });
            if(userAccount){
                return this.login({email:email,password:password});
            }else{
                return userAccount;
            }
        } catch (e){
            console.error(e)
        }
    }

    async login({email, password}){
        try{
            const result = await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
            return result;
        }catch(e){
            throw e;
        }
    }

    async getCurrentUser(){
        try{
            const result = await this.account.get();
            if(result){
                return result;
            }else{
                return null;
            }
        }catch(error){
            throw error;
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;

