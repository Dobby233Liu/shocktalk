// The proxy entrypoint.
// This is a part of Shocktalk.

var mClassName = "com/github/dobby233liu";
const Main = require("./src/" + mClassName + "/shocktalk/Main");

Main.main(process.argv.splice(2), __dirname);