module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Force down-leveling of private class fields/methods. The Windows
      // Hermes bytecode compiler (hermesc) does not accept `#private`
      // syntax, so we transform it explicitly. Use spec mode (loose:false)
      // so fields are defined with Object.defineProperty rather than raw
      // assignment -- raw assignment crashes Hermes when a field shadows a
      // read-only property (e.g. an enum's `NONE`). Must be consistent.
      ["@babel/plugin-transform-private-methods", { loose: false }],
      ["@babel/plugin-transform-private-property-in-object", { loose: false }],
      ["@babel/plugin-transform-class-properties", { loose: false }],
      // react-native-worklets/plugin must be listed last.
      "react-native-worklets/plugin",
    ],
  };
};
