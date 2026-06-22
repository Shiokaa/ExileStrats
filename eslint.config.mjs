import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Non-source folders: design references (runtime maison), generated context, tooling.
    "design_handoff/**",
    "graphify-out/**",
    ".specify/**",
    ".claude/**",
    // Prisma generated client (regenerated via postinstall).
    "src/generated/**",
  ]),
]);

export default eslintConfig;
