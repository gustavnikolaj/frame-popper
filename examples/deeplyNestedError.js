const invariant = require("invariant");

function fourthFunction() {
  invariant(false, "This is a test error.");
}

function thirdFunction() {
  return fourthFunction();
}

function secondFunction() {
  return thirdFunction();
}

module.exports = function firstFunction() {
  return secondFunction();
};
