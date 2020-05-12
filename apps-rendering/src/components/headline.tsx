// ----- Imports ----- //

import React, { ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { background, neutral, text } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';

import { Item } from 'item';
import { darkModeCss as darkMode } from 'styles';
import { getPillarStyles, PillarStyles } from 'pillarStyles';
import StarRating from './starRating';
import { Display, Design } from 'format';


// ----- Component ----- //

interface Props {
    item: Item;
}

const darkStyles = darkMode`
    background: ${background.inverse};
    color: ${neutral[86]};
`;

const styles = css`
    ${headline.medium()}
    padding-bottom: ${remSpace[9]};
    color: ${text.primary};
    margin: 0;

    ${darkStyles}
`;

const immersiveStyles = css`
    ${headline.medium({ fontWeight: 'bold' })}
    background-color: ${neutral[7]};
    color: ${neutral[100]};
    font-weight: 700;
    padding: ${remSpace[1]} ${remSpace[2]} ${remSpace[6]} ${remSpace[2]};
    margin: 0;

    ${darkStyles}
`;

const analysisStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    ${styles}
    ${headline.medium({ lineHeight: 'regular', fontWeight: 'light' })}

    span {
        box-shadow: inset 0 -0.1rem ${kicker};
        padding-bottom: 0.2rem;
    }
`;

const mediaStyles = css `
    ${styles}
    color: ${neutral[100]};
    ${headline.medium({ fontWeight: 'medium' })}
    
    ${darkMode`
        color: ${neutral[86]};
    `}
`

const featureStyles = ({ featureHeadline }: PillarStyles): SerializedStyles => css`
    ${styles}
    ${headline.medium({ fontWeight: 'bold' })}
    color: ${featureHeadline};
`;

const commentStyles = css`
    ${styles}
    ${headline.medium({ fontWeight: 'light' })}
    padding-bottom: ${remSpace[1]};
`;

const advertisementFeatureStyles = css`
    ${styles}
    ${textSans.xxxlarge({ lineHeight: 'regular' })}}
`;

const getStyles = (item: Item): SerializedStyles => {
    const pillarStyles = getPillarStyles(item.pillar);

    if (item.display === Display.Immersive) {
        return immersiveStyles;
    }

    switch (item.design) {
        case Design.Analysis:
            return analysisStyles(pillarStyles);
        case Design.Feature:
            return featureStyles(pillarStyles);
        case Design.Comment:
            return commentStyles;
        case Design.Media:
            return mediaStyles;
        case Design.AdvertisementFeature:
            return advertisementFeatureStyles;
        default:
            return styles;
    }
}

const Headline = ({ item }: Props): ReactElement =>
    <h1 css={getStyles(item)}>
        <span>{ item.headline }</span>
        <StarRating item={item} />
    </h1>;


// ----- Exports ----- //

export default Headline;
