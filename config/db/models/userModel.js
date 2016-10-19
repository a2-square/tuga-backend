var schema = mongoose.Schema;

var userSchema = new schema({
    name: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    username: {type: String},
    password: {type: String},
    facebook: {type: Object},
    linkedin: {type: Object},
    email: {type:String, unique: true }
});

userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

exports.userModel = mongoose.model("userModel", userSchema);