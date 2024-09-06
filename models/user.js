import { Schema, model, models} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email must be unique"],
        required: [true, "Email is required"]
    },
    username: {
        type: String,
        unique: [true, "Username must be unique"],
        required: [true, "Username is required"],
    },
    image: String
});

const User = models.User || model("User", userSchema);

export default User

// 1:48:05