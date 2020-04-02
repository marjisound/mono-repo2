import React from 'react';

import LiveblogSeries from 'components/liveblog/series';
import LiveblogHeadline from 'components/liveblog/headline';
import LiveblogStandfirst from 'components/liveblog/standfirst';
import Metadata from 'components/liveblog/metadata';
import LiveblogKeyEvents from 'components/liveblog/keyEvents';
import LiveblogBody from 'components/liveblog/body';
import HeaderImage from 'components/shared/headerImage';
import Tags from 'components/shared/tags';
import { wideColumnWidth, darkModeCss } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { neutral, background } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { PillarStyles, getPillarStyles } from 'pillar';
import { Liveblog } from 'item';
import { ImageMappings } from 'components/shared/page';

const LiveblogArticleStyles: SerializedStyles = css`
    background: ${neutral[97]};
`;

const BorderStyles = css`
    ${darkModeCss`background: ${background.inverse};`}

    ${from.wide} {
        width: 1200px;
        margin: 0 auto;
    }
`;

const HeaderImageStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    background: ${pillarStyles.liveblogBackground};

    ${from.wide} {
        padding-bottom: 12px;
    }

    figure {
        margin: 0;

        ${from.wide} {
            margin-left: ${wideColumnWidth}px;
        }
    }
`;

interface LiveblogArticleProps {
    item: Liveblog;
    imageMappings: ImageMappings;
}

const LiveblogArticle = ({ item, imageMappings }: LiveblogArticleProps): JSX.Element => {
    return (
        <main css={LiveblogArticleStyles}>
            <div css={BorderStyles}>
                <LiveblogSeries series={item.series} pillar={item.pillar} />
                <LiveblogHeadline headline={item.headline} pillar={item.pillar} />
                <LiveblogStandfirst standfirst={item.standfirst} pillar={item.pillar} />
                <Metadata item={item} imageMappings={imageMappings} />
                <HeaderImage
                    image={item.mainImage}
                    imageMappings={imageMappings}
                    className={HeaderImageStyles(getPillarStyles(item.pillar))}
                    pillar={item.pillar}
                />
                <LiveblogKeyEvents blocks={item.blocks} pillar={item.pillar} />
                <LiveblogBody
                    blocks={item.blocks}
                    pillar={item.pillar}
                    imageMappings={imageMappings}
                    totalBodyBlocks={item.totalBodyBlocks}
                />
                <Tags tags={item.tags} background={neutral[93]} />
            </div>
        </main>
    );
}

export default LiveblogArticle;
