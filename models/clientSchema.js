import mongoose from "mongoose";
import validator from "validator";


const cliendtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [20, "Name cannot be more than 20 characters"],
        minlength: [3, "Name cannot be less than 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide a phone number"],
        unique: true,
        trim: true,
        length: [10, "Phone number must be 10 digits"],
        validate: [validator.isMobilePhone, "Please provide a valid phone number"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password cannot be less than 6 characters"],
    },
    address: {
        type: String,
        required: [true, "Please provide an address"],
        trim: true,
        maxlength: [500, "Address cannot be more than 500 characters"],
    },
}, { timestamps: true }
);
const Client = mongoose.model("Client", cliendtSchema);
export default Client;