class AppBootHook {
    constructor(app) {
      this.app = app;
      const errorHandle = require("./app/middleware/error_handler.js")({}, this.app);
      this.app.use(errorHandle)
    }

}module.exports = AppBootHook;