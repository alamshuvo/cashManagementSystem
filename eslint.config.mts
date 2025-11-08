import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { 
      globals: { 
        ...globals.browser, 
        process: "readonly" 
      } 
    },
    rules: { "no-console": "warn", "no-unused-vars": "warn","no-unused-expressions":"error","prefer-const":"error","no-undef":"error" }
  },
  tseslint.configs.recommended,
]);
