import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected");
    } catch (error) {
        console.error("MongoDB Error:", error.message);
    }
};

export default connectDb;