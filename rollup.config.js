import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser  from "@rollup/plugin-terser";
import scss from "rollup-plugin-scss";

export default defineConfig({
    input: "src/index.ts", // Entry point of your TypeScript/JavaScript
    output: {
      dir: "dist", // Output directory
      format: "es", // Module build type
      sourcemap: true,
    },
    external: ["react", "react-dom"], // External libraries on which your library depends
    plugins: [
      typescript({ tsconfig: "tsconfig.json" }), // Compile TypeScript to JavaScript
      resolve(), // Resolve node_modules dependencies
      commonjs(), // Convert CommonJS modules to ES6
      babel({
        // Transpile to ES5
        exclude: "node_modules/**", // Don't transpile dependencies
        babelHelpers: "runtime", // Required for @babel/plugin-transform-runtime
        presets: ["@babel/preset-env", "@babel/preset-react"], // Include presets for env and React
      }),
      scss({
        output: "dist/index.css",
        failOnError: true,
        sourceMap : true,
        outputStyle : "compressed",
        fileName : "index.css"
      }),
      terser(), // Minify the bundle
    ],
  });
