// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderImage from 'components/headerImage';
import Series from 'components/shared/articleSeries';
import Headline from 'components/headline';
import Standfirst from 'components/standfirst';
import Body from 'components/shared/articleBody';
import Metadata from 'components/standard/metadata';
import { darkModeCss, articleWidthStyles } from 'styles';
import { Keyline } from 'components/shared/keyline';
import { Standard, Review, getFormat } from 'item';
import { ImageMappings } from 'components/shared/page';


// ----- Styles ----- //

const Styles = css`
    background: ${neutral[97]};
`;

const DarkStyles = darkModeCss`
    background: ${background.inverse};
`;

const BorderStyles = css`
    background: ${neutral[100]};
    ${darkModeCss`background: ${background.inverse};`}

    ${from.wide} {
        width: ${breakpoints.wide}px;
        margin: 0 auto;
    }
`;


// ----- Component ----- //

interface Props {
    imageMappings: ImageMappings;
    item: Standard | Review;
    children: ReactNode[];
}

const AdvertisementFeature = ({ imageMappings, item, children }: Props): JSX.Element => {
    return <main css={[Styles, DarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <HeaderImage
                    image={item.mainImage}
                    imageMappings={imageMappings}
                    format={getFormat(item)}
                />
                <div css={articleWidthStyles}>
                    <Series series={item.series} pillar={item.pillar} />
                    <Headline item={item} />
                    <Standfirst item={item} />

                </div>
                <Keyline {...item} />
                <section css={articleWidthStyles}>
                    <Metadata imageMappings={imageMappings} item={item} />
                </section>
            </header>
            <Body pillar={item.pillar} className={[articleWidthStyles]}>
                {children}
            </Body>
        </article>
    </main>
}


// ----- Exports ----- //

export default AdvertisementFeature;
