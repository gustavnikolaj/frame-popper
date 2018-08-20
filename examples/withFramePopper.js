const deeplyNestedError = require("./deeplyNestedError");
const framePopper = require("../");

try {
  deeplyNestedError();
} catch (e) {
  framePopper(e);
  console.error(e.stack);
}
