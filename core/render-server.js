import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';

export default (pageName) => {
    const htmlTemplate = fs.readFileSync(path.resolve(__dirname, `../static/html/${pageName}.html`)).toString();
    const App = require(`../client/pages/${pageName}`).default;
    const html = htmlTemplate.replace("<!-- react-doms -->", renderToString(<App />));
    return html;
};




