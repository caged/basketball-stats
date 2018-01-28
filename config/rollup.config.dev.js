import node from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    file: "public/app.js",
    format: "iife",
    name: "BasketballStats"
  },
  plugins: [
    node(),
    commonjs({
      include: "node_modules/**"
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    })
  ]
}
