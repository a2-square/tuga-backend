var schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local: {
        email 			: {type:String},
        password 		: {type: String},
        firstName		: {type: String},
        lastName		: {type: String},
    },
    facebook: {
        id				: {type: String,},
        accessToken		: {type: String},
        email			: {type: String},
        firstName		: {type: String},
        lastName		: {type: String},
        gender			: {type: String},
        profile_picture	: {type: String},
        linkedAt		: {type: Date}
    },
    linkedin: {
        id				: {type: String,},
        accessToken		: {type: String},
        email			: {type: String},
        firstName		: {type: String},
        lastName		: {type: String},
        gender			: {type: String},
        profile_picture	: {type: String},
        linkedAt		: {type: Date}
    }
});

userSchema.methods.validPassword = function( pwd ) {
    return ( this.local.password == pwd );
};

exports.userModel = mongoose.model("userModel", userSchema);