import nextConfig from "eslint-config-next";
import prettier from "eslint-config-prettier";

// Workaround: eslint-config-next v16 is not fully ESLint v10 compatible.
// Drop its Babel parser (lacks addGlobals) and react plugin (uses removed
// context.getFilename). Remove once Next.js ships a fix.
function patchConfig(c) {
  let out = c;

  if (out.languageOptions?.parser) {
    const { parser: _p, ...langOpts } = out.languageOptions;
    out = { ...out, languageOptions: langOpts };
  }

  if (out.plugins?.react) {
    const { react: _r, ...plugins } = out.plugins;
    out = { ...out, plugins };
  }

  if (out.rules) {
    const rules = Object.fromEntries(
      Object.entries(out.rules).filter(([k]) => !k.startsWith("react/"))
    );
    out = { ...out, rules };
  }

  return out;
}

const config = [
  { ignores: [".venv/**", "public/static/pdfjs/**"] },
  ...nextConfig.map(patchConfig),
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  prettier,
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
