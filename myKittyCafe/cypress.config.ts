import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Add environment variables here
    env: {
      baseUrlLocal: 'http://localhost:8100',
      baseUrlProd: 'https://mykittycafe.azurewebsites.net',
    },
  },
});