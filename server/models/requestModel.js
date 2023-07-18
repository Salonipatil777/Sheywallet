const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    amount: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'pending',
    }
},
{
    timestamps: true
})

const Request = mongoose.model("Requests", requestSchema);
module.exports = Request;