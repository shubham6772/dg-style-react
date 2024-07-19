import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default defineConfig({
    input: "./src/index.ts", //main endpoint file
    output: {
        dir: "dist",  // where is build going to store
        format: "es", // module build type
        name: "dg-style-react", // bundle name
        sourcemap: true,
    },

    external: ["react", "react-dom", "styled-components"], //external librries on which library dependent
    plugins: [
        typescript({ tsconfig: "./tsconfig.json" }),
        terser(),
    ],
})