var chalk = require('chalk');

var dbURL = "mongodb://localhost/tugaDB";

mongoose.connect(dbURL);

mongoose.connection.on("connected", function() {
	console.log(chalk.bgGreen('TugaApp is connected with tugaDB'));
});

mongoose.connection.on("error", function(err){
	console.log(chalk.bgRed("TugaApp is not connected with tugaDB due to" + " " + err ));
})
