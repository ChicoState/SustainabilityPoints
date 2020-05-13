module.exports = {
    "parser": "babel-eslint",

    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },

    "env": {
        "browser": true,
        "react-native/react-native": true
    },

    "plugins": [
        "react", 
        "react-native",
        "react-redux"
    ],

    "extends": [
        "eslint:recommended", 
        "plugin:react/recommended",
    ],
    
    "ignorePatterns": [
        "node_modules/", 
        ".expo/", 
        ".vscode/", 
        "*.json", 
        "*.html", 
        "assets/"
    ],
    
    "rules": {
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-raw-text": 2,
        "react-native/sort-styles": [
            "error",
            "asc",
            {
                "ignoreClassNames": false,
                "ignoreStyleProperties": false
            }
        ],
        "react/no-unused-prop-types": 0,
        "react-redux/no-unused-prop-types": 2,
        "react/prop-types": [
            2,
            {
                "skipUndeclared": true
            }
        ]
    }
}