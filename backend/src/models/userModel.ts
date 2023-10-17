import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Define an interface for the User document
interface UserDocument extends Document {
    email: string;
    password: string;
}

// Define a Mongoose schema for the User model
const userSchema = new mongoose.Schema<UserDocument>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Define the User model type
export interface UserModel extends Model<UserDocument> {
    signup(email: string, password: string): Promise<UserDocument>;
}

// static signup method
userSchema.statics.signup = async function (email: string, password: string) {
    
    // validation
    if(!email || !password) { // checks if email and password are provided
        throw new Error('Email and password are required');
    }
    if (!validator.isEmail(email)) { // checks if email is in email format
        throw new Error('Email is invalid');
    }
    if (!validator.isStrongPassword(password)) { // checks if password is strong
        throw new Error('Password is too weak');
    }
    
    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashedPassword });

    return user;
};

// Define the User model type
export interface UserModel extends Model<UserDocument> {
    login(email: string, password: string): Promise<UserDocument>;
}


// static login method
userSchema.statics.login = async function (email: string, password: string) {
    
    // validation
    if(!email || !password) { // checks if email and password are provided
        throw new Error('Email and password are required');
    }
    if (!validator.isEmail(email)) { // checks if email is in email format
        throw new Error('Email is invalid');
    }
    
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Email does not exist');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password is incorrect');
    }

    return user;
};

// Create and export the User model
export const UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema);