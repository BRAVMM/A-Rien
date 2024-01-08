module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "expo-router/babel",
            [
                "module-resolver",
                {
                    alias: {
                        "@App": "./app",
                        "@Components": "./app/Components",
                        "@Interfaces": "./app/Interfaces",
                    },
                }
            ]
        ]
    };
};
