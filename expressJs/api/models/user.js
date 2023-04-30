import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String,
    userName: String,
    mobileNumber: Number
}, { versionKey: false })

const user = new mongoose.model("users", userSchema, "userDb");
export default user