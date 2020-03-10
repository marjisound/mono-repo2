// ----- Imports ----- //

import setup from 'client/setup';
import { fromCapi, Liveblog } from 'item';
import ReactDOM from 'react-dom';
import LiveblogBody from 'components/liveblog/body';
import { createElement as h } from 'react';
import { Content } from 'mapiThriftModels';

// ----- Run ----- //

declare global {
    interface Window {
        __INITIAL__DATA__: Content & {
            imageSalt: string;
        };
    }
}

setup();

const browserParser = (string: string): DocumentFragment => {
    const frag = new DocumentFragment();
    const docNodes = new DOMParser().parseFromString(string, 'text/html').body.childNodes;
    Array.from(docNodes).forEach(node => frag.appendChild(node));
    return frag;
}

const {
    pillar,
    blocks,
    totalBodyBlocks
} = fromCapi(browserParser)(window.__INITIAL__DATA__) as Liveblog;
const { imageSalt } = window.__INITIAL__DATA__;
ReactDOM.hydrate(h(LiveblogBody, { pillar, blocks, imageSalt, totalBodyBlocks }), document.querySelector('#blocks'))