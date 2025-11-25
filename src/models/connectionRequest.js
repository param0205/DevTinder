const mongoose = require("mongoose");

const connectionRequestionSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    status: {
        type: "String",
        required: true,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        },
    }
}, {
    timestamps: true
});

connectionRequestionSchema.index({fromUserId:1, toUserId:1});

connectionRequestionSchema.pre("save", function (next) {

    const connectionRequest = this;
    if (connectionRequest.toUserId.equals(connectionRequest.fromUserId)) { 
        throw new Error("Cannot Send connection request to yourself");
    }

    next();
})


const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestionSchema);

module.exports = { ConnectionRequest }