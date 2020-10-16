// ----- Imports ----- //

import { createHash } from 'crypto';
import { Design } from '@guardian/types/Format';

import { BodyElement, ElementKind } from 'bodyElement';
import { partition, Result } from '@guardian/types/result';
import { Item } from 'item';
import { compose, pipe2 } from 'lib';
import { map, withDefault } from '@guardian/types/option';
import { ThirdPartyEmbeds } from 'capi';


// ----- Types ----- //

interface Assets {
    scripts: string[];
    styles: string[];
}


// ----- Functions ----- //

const assetHash = (asset: string): string =>
    createHash('sha256').update(asset).digest('base64');

const extractInteractiveAssets = (elements: BodyElement[]): Assets =>
    elements.reduce<Assets>(({ scripts, styles }, elem) => {
        if (elem.kind === ElementKind.InteractiveAtom) {
            return {
                styles: [ ...styles, elem.css ],
                scripts: pipe2(elem.js, map(js => [ ...scripts, js ]), withDefault(scripts)),
            };
        }

        if (elem.kind === ElementKind.ChartAtom) {
            return {
                styles: [ ...styles, ...elem.css ],
                scripts: [ ...scripts, ...elem.js ],
            };
        }

        return { scripts, styles };
    }, { scripts: [], styles: [] });

const getElements = (item: Item): Result<string, BodyElement>[] =>
    item.design === Design.Live ? item.blocks.flatMap(block => block.body) : item.body;

const getValidElements = (item: Item): BodyElement[] =>
    partition(getElements(item)).oks;

const interactiveAssets = compose(extractInteractiveAssets, getValidElements);

const assetHashes = (assets: string[]): string =>
    assets.map(asset => `'sha256-${assetHash(asset)}'`).join(' ');

// const cspString = `
//     default-src https:;
//     script-src https: 'unsafe-inline' 'unsafe-eval';
//     frame-src https: data:;
//     style-src https: 'unsafe-inline';
//     img-src https: data: blob:;
//     media-src https: data: blob:;
//     font-src https: data:;
//     connect-src https: wss:;
//     child-src https: blob:
// `.trim()

const buildCsp = ({ styles, scripts }: Assets, {...thirdPartyEmbed }: ThirdPartyEmbeds): string => `
    default-src 'self';
    style-src 'self' ${assetHashes(styles)} https://interactive.guim.co.uk ${thirdPartyEmbed.twitter ? 'https://platform.twitter.com' : ''};
    img-src 'self' https://static.theguardian.com https://*.guim.co.uk ${thirdPartyEmbed.twitter ? 'https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com data:' : ''};
    script-src 'self' ${assetHashes(scripts)} ${thirdPartyEmbed.instagram ? 'http://www.instagram.com/embed.js' : ''} https://interactive.guim.co.uk https://s16.tiktokcdn.com https://www.tiktok.com/embed.js https://sf16-scmcdn-sg.ibytedtos.com/ ${thirdPartyEmbed.twitter ? 'https://platform.twitter.com https://cdn.syndication.twimg.com' : ''};
    frame-src https://www.theguardian.com https://www.scribd.com ${thirdPartyEmbed.instagram ? 'https://www.instagram.com' : ''} https://www.tiktok.com https://interactive.guim.co.uk ${thirdPartyEmbed.spotify ? 'https://open.spotify.com' : ''} ${thirdPartyEmbed.youtube ? 'https://www.youtube-nocookie.com' : ''} https://player.vimeo.com/ ${thirdPartyEmbed.twitter ? 'https://platform.twitter.com https://syndication.twitter.com https://twitter.com' : ''};
    font-src 'self' https://interactive.guim.co.uk;
    connect-src 'self' https://callouts.code.dev-guardianapis.com/formstack-campaign/submit https://interactive.guim.co.uk https://sf-hs-sg.ibytedtos.com/ https://gdn-cdn.s3.amazonaws.com/
`.trim();

function csp(
    item: Item, 
    additionalAssets: Assets, 
    thirdPartyEmbed: ThirdPartyEmbeds,
     ): string {
    const interactives = interactiveAssets(item);
    const assets = {
        styles: [ ...interactives.styles, ...additionalAssets.styles ],
        scripts: [ ...interactives.scripts, ...additionalAssets.scripts ],
    };

    return buildCsp(assets, { ...thirdPartyEmbed});
}


// ----- Exports ----- //

export {
    csp,
    assetHashes,
};
