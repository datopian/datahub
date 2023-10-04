import './tailwind-imports.css';

const preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
    },
    globalTypes: {
        darkMode: {
            defaultValue: false, // Enable dark mode by default on all stories
        },
        className: {
            defaultValue: 'dark', // Set your custom dark mode class name
        },
    },
};

export default preview;
