const deeplyNestedError = require("./deeplyNestedError");

try {
  deeplyNestedError();
} catch (e) {
  console.error(e.stack);
}
