"use strict";

var _app = require("./shared/http/app");

const port = process.env.PORT || 4000;

_app.app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});