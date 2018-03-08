// @flow

const express = require('express');
const pagesMiddleware = require('../dist/app.server.js').default;
const fetch = require('node-fetch');

const app = express();

app.use('/pages/:page', [
    async (req, res, next) => {
        // TODO: get config from request
        const { html, ...config } = await fetch(
            `${req.query.url ||
            'https://www.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance'}.json`,
        ).then(article => article.json());
        req.body = config;
        next();
    },
    pagesMiddleware(),
]);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send(err.stack);
});

app.listen(9000, () => {
    console.log('Server listening on port 9000');
});
