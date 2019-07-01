module.exports = {
  "plugins": [
    "jest"
  ],
  "extends": [
    "airbnb",
    "plugin:jest/recommended",
    "plugin:jest/style"
  ],
  "parser": "babel-eslint",
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "webpack.common.js"
      }
    }
  },
  "env": {
    "browser": true
  },
  "rules": {
    "jest/consistent-test-it": 2
  },
  "overrides": [
    {
      "files": [
        "*.actions.js",
        "*.service.js",
        "*.constants.js",
        "*.logic.js",
        "*.helpers.js"
      ],
      "rules": {
        "import/prefer-default-export": "off"
      }
    }
  ]
}
