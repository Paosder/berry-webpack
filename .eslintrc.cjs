module.exports = {
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "prettier",
    "react-app",
  ],
  settings: {
    "import/extensions": [".js", ".ts", ".d.ts"],
    "import/parsers": {
      "@typescript-eslint/parser": [".js", ".ts", ".jsx", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
      },
    },
  },
  rules: {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "no-bitwise": "off",
    "no-undef": "off",
    camelcase: "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "max-classes-per-file": "off",
    "no-param-reassign": "off",
    "no-shadow": "off", // disable to remove bug.
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-inferrable-types": "off",
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "*.config.js",
    "*.config.cjs",
    "*.config.mjs",
    "webpack.*",
    "esbuild.*",
    "setup.js",
    "*.test.*",
    "*.spec.*",
    "*.cjs",
  ],
};
