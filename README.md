# Frame Popper

**Only intended for use in Node.js.**

When using the [invariant](https://github.com/zertosh/invariant) module the
errors are thrown with a custom property called `framesToPop`. The idea is that
your error handler will know to pop off the additional stacks from the top.
That kind of errors also come from react (although usage in browsers is not
supported by this module).

According to [this
tweet](https://twitter.com/joshwnj/status/578062208283717632) it is used by an
internal error logging system at facebook.

It's a nice idea though, and I think we all deserve to have something pop our
irrelevant frames as well.

## Limitation: Only working in Node.js

At the moment I don't need this module in the browser, so I took a shortcut and
used dirty string manipulation instead of a module which transforms the
serialized stacktraces to into proper structured data.

## Limitation: Will mutate your errors!

The error that is passed in, is mutated in place NOT cloned.

## Installation

```
npm install --save @gustavnikolaj/frame-popper
```

... or ...

```
yarn add @gustavnikolaj/frame-popper
```

## Example:

See [the source](./examples/deeplyNestedError.js) of the example function that
we call.

Without frame popper ([source](./examples/withoutFramePopper.js)):

```
$ node examples/withoutFramePopper.js
Invariant Violation: This is a test error.
    at invariant (./node_modules/invariant/invariant.js:40:15)
    at fourthFunction (./examples/deeplyNestedError.js:4:3)
    at thirdFunction (./examples/deeplyNestedError.js:8:10)
    at secondFunction (./examples/deeplyNestedError.js:12:10)
    at firstFunction (./examples/deeplyNestedError.js:16:10)
    at Object.<anonymous> (./examples/withoutFramePopper.js:4:3)
```

With frame popper ([source](./examples/withFramePopper.js)):

```
$ node examples/withFramePopper.js
Invariant Violation: This is a test error.
    at fourthFunction (./examples/deeplyNestedError.js:4:3)
    at thirdFunction (./examples/deeplyNestedError.js:8:10)
    at secondFunction (./examples/deeplyNestedError.js:12:10)
    at firstFunction (./examples/deeplyNestedError.js:16:10)
    at Object.<anonymous> (./examples/withFramePopper.js:5:3)
```
