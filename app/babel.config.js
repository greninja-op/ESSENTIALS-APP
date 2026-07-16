module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Force down-leveling of private class fields/methods. The Windows
      // Hermes bytecode compiler (hermesc) does not accept `#private`
      // syntax, so we transform it explicitly. `loose` must be consistent
      // across all three.
      ["@babel/plugin-transform-private-methods", { loose: true }],
      ["@babel/plugin-transform-private-property-in-object", { loose: true }],
      ["@babel/plugin-transform-class-properties", { loose: true }],
      // react-native-worklets/plugin must be listed last.
      "react-native-worklets/plugin",
    ],
  };
};
