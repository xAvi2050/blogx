import config from '../config/config.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        const user = await this.account.create(
            ID.unique(),
            email,
            password,
            name
        );

        try {
            return await this.login({ email, password });
        } catch {
            return user; // Account created but cannot login yet
        }
    }

    async login({ email, password }) {
        return await this.account.createEmailPasswordSession(email, password);
    }

    async getCurrentUser() {
        return await this.account.get();
    }

    async logout() {
        return await this.account.deleteSessions('current');
    }
}

const authService = new AuthService();

export default authService;