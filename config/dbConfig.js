import mongoose from "mongoose";    
import dotenv from "dotenv";

class DBConfig {
    constructor() {
        dotenv.config();
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("MongoDB connected");
        } catch (error) {
            console.error("MongoDB connection error:", error);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log("MongoDB disconnected");
        } catch (error) {
            console.error("MongoDB disconnection error:", error);
        }
    }
}

export default new DBConfig();
