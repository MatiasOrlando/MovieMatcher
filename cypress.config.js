import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
  env: {
    API_KEY: "3651041388931cf01228edbff2087680",
  },
});
