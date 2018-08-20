module.exports = function framePopper(err) {
  if (err.framesToPop) {
    let headerLines;
    let traceLines;
    const stackTraceLines = err.stack.split("\n");

    for (let i = 0; i < stackTraceLines.length; i++) {
      if (/^\s+at/.test(stackTraceLines[i])) {
        headerLines = stackTraceLines.slice(0, i);
        traceLines = stackTraceLines.slice(i);
        break;
      }
    }

    if (Array.isArray(headerLines) && Array.isArray(traceLines)) {
      const newStack = [
        ...headerLines,
        ...traceLines.slice(err.framesToPop)
      ].join("\n");

      err.stack = newStack;
      delete err.framesToPop;
    }
  }

  return err;
};
