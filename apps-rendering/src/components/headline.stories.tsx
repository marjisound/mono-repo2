// ----- Imports ----- //

import React, { ReactElement } from 'react';
import { withKnobs, select, boolean, radios } from '@storybook/addon-knobs';

import Headline from './headline';
import { Item, Design, Display } from 'item';
import { Pillar } from 'pillar';
import { None } from 'types/option';


// ----- Setup ----- //

const item: Item = {
    pillar: Pillar.news,
    design: Design.Article,
    display: Display.Standard,
    body: [],
    headline: 'Reclaimed lakes and giant airports: how Mexico City might have looked',
    standfirst: new None(),
    byline: '',
    bylineHtml: new None(),
    publishDate: new None(),
    mainImage: new None(),
    contributors: [],
    series: {
        id: '',
        type: 0,
        webTitle: '',
        webUrl: '',
        apiUrl: '',
        references: [],
    },
    commentable: false,
    tags: [],
};

const pillarOptions = {
    News: Pillar.news,
    Opinion: Pillar.opinion,
    Sport: Pillar.sport,
    Culture: Pillar.arts,
    Lifestyle: Pillar.lifestyle,
};

const starRating: Record<number, number> = [1, 2, 3, 4, 5];


// ----- Stories ----- //

const Default = (): ReactElement =>
    <Headline item={{
        ...item,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: select('Pillar', pillarOptions, Pillar.news),
    }} />

const AnalysisNew = (): ReactElement =>
    <Headline item={{
        ...item,
        design: Design.Analysis,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: select('Pillar', pillarOptions, Pillar.news),
    }} />

const FeatureNew = (): ReactElement =>
    <Headline item={{
        ...item,
        design: Design.Feature,
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
        pillar: select('Pillar', pillarOptions, Pillar.news),
    }} />

const ReviewNew = (): ReactElement =>
    <Headline item={{
        ...item,
        design: Design.Review,
        starRating: radios('Rating', starRating, 3),
        display: boolean('Immersive', false) ? Display.Immersive : Display.Standard,
    }} />


// ----- Exports ----- //

export default {
    component: Headline,
    title: 'Headline',
    decorators: [ withKnobs ],
}

export {
    Default,
    AnalysisNew,
    FeatureNew,
    ReviewNew,
}
