// @flow

import { connect } from 'unistore/preact';

import Header from 'components/Header';

const Article = ({ config }) => (
    <article>
        <Header />
        <h1>{config.page.headline}</h1>
    </article>
);

export default connect('config')(Article);
