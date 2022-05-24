export default function () {
  return {
    files: ["./package.json", "./lexic.js", "!./tests/**/*.js"],
    tests: ["./tests/**/*.js"],

    runMode: "onsave",

    env: {
      type: "node",
      runner: "/usr/local/bin/node",
      params: {
        runner: [
          "--experimental-import-meta-resolve",
          "--experimental-specifier-resolution=node",
          "--no-warnings",
        ].join(" "),
      },
    },

    // see: https://wallabyjs.com/docs/integration/esm.html#mocha
    testFramework: "mocha",
    symlinkNodeModules: true,
    workers: { restart: true },
  }
}
