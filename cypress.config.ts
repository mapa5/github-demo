import { defineConfig } from "cypress";
import path from "path";
import fs from "fs";

export default defineConfig({
  e2e: {

    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        logInfo(message) {
          const logFilePath = path.join(__dirname, 'mylog.log');
          fs.appendFileSync(logFilePath, new Date().toUTCString() + " - " + message + "\n");
          return null;
        },
      });
    },
  },
});
