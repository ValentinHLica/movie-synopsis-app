const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@pages": "src/pages",
    "@ui": "src/components/UI/index.tsx",
    "@config": "src/config",
    "@interface": "src/interface",
    "@styles": "src/styles",
    "@utils": "src/utils",
    "@icon": "src/components/CustomIcons.tsx",
    "@api": "src/api",
    "@context": "src/components/Context.tsx",
  })(config);

  return config;
};
