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

 //Generate hash passward
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

exports.userModel = mongoose.model("userModel", userSchema);