import config from '../config.js';
import { Client, Databases, Query } from 'appwrite';

export class PostService {
    client = new Client();
    databases;
    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)   
        this.databases = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const post = await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
            return post;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const post = await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
            return post;
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error('Error deleting post:', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );
            return post;
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    }

    async getAllPosts(queries = [Query.equal('status', 'published')]) {
        try {
            const posts = await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                [
                    ...queries,
                    Query.orderDesc('createdAt'),
                    Query.limit(10),
                    Query.offset(0),
                ],
            );
            return posts;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }
}

const postService = new PostService();

export default postService;