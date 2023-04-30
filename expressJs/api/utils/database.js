import mongoose from "mongoose";
const mongoDbConnect = async (DATABASE_URI) => {
    try {
        const DB_NAME = { dbName: 'UMS' };
        await mongoose.connect(DATABASE_URI, DB_NAME);
        console.log('Connected To MongoDb');
    } catch (error) {
        console.log(error);
    }
}
export default mongoDbConnect;