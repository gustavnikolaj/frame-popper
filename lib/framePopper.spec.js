const expect = require("unexpected");
const framePopper = require("../lib/framePopper");
const invariant = require("invariant");

it("should be a function", () => {
  expect(framePopper, "to be a function");
});

it("should not mangle an error", () => {
  const err = new Error("Foo");

  const originalError = {
    message: err.message,
    stack: err.stack,
    ...err
  };
  const processedError = framePopper(err);

  expect(originalError, "to equal", {
    message: processedError.message,
    stack: processedError.stack,
    ...processedError
  });
});

it("should transform an invariant error", () => {
  let invariantErr;
  try {
    invariant(false, "test error");
  } catch (err) {
    invariantErr = err;
  }

  const originalStack = invariantErr.stack;

  const processedError = framePopper(invariantErr);
  const processedStack = processedError.stack;

  return expect(
    originalStack.split("\n").length,
    "to be greater than",
    processedStack.split("\n").length
  );
});

it("should not process an error from edge dev tools", () => {
  const err = {
    columnNumber: 45,
    description: "foo",
    fileUrl: "eval code (2)",
    lineNumber: 1,
    message: "foo",
    stack: "Error: foo at eval code (eval code:1:7)",
    framesToPop: 1
  };

  framePopper(err);

  return expect(err, "to satisfy", {
    stack: "Error: foo at eval code (eval code:1:7)",
    framesToPop: 1
  });
});
