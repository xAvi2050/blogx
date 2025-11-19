import config from '../config.js';
import { Client, ID, Storage } from 'appwrite';

export class StorageService {
    client = new Client();
    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appWriteBucketId,
                fileId
            );
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.appWriteBucketId,
                fileId
            );
        } catch (error) {
            throw error;
        }
    }
}

const storageService = new StorageService();

export default storageService;