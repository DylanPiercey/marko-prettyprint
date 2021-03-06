"use strict";

let beautifyJS = require("./util/beautifyJS");

module.exports = function printScriptlet(node, printContext, writer) {
  const currentIndentString = printContext.currentIndentString;
  const indentString = printContext.indentString;

  let code = node.code;

  if (node.tag) {
    writer.write("<%");
    writer.write(code);
    writer.write("%>");
  } else {
    if (code.startsWith("\n")) {
      code = beautifyJS(code, printContext, printContext.depth + 1).trim();
      // Multi-line scriptlet

      writer.write(
        currentIndentString +
          "$ {\n" +
          currentIndentString +
          indentString +
          code +
          "\n" +
          currentIndentString +
          "}"
      );
    } else {
      code = beautifyJS(code, printContext, printContext.depth).trim();
      writer.write("$ ");
      writer.write(code);
    }
  }
};
