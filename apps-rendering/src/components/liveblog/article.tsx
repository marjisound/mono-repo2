import React from 'react';

import LiveblogSeries from 'components/liveblog/series';
import LiveblogHeadline from 'components/liveblog/headline';
import LiveblogStandfirst from 'components/liveblog/standfirst';
import Metadata from 'components/liveblog/metadata';
import LiveblogKeyEvents from 'components/liveblog/keyEvents';
import LiveblogBody from 'components/liveblog/body';
import HeaderImage from 'components/headerImage';
import Tags from 'components/shared/tags';
import { darkModeCss, wideColumnWidth, articleWidthStyles } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { neutral, background } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Liveblog, getFormat } from 'item';

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

const headerImageStyles = (pillarStyles: PillarStyles): SerializedStyles => css`
    background: ${pillarStyles.liveblogBackground};

    ${from.wide} {
        padding-bottom: 12px;
        padding-left: ${wideColumnWidth}px;
    }
`;

interface LiveblogArticleProps {
    item: Liveblog;
}

const LiveblogArticle = ({ item }: LiveblogArticleProps): JSX.Element => {
    const format = getFormat(item);

    return (
        <main css={LiveblogArticleStyles}>
            <div css={BorderStyles}>
                <LiveblogSeries series={item.series} pillar={item.pillar} />
                <LiveblogHeadline headline={item.headline} pillar={item.pillar} />
                <LiveblogStandfirst standfirst={item.standfirst} format={format} />
                <Metadata item={item} />
                <div css={headerImageStyles(getPillarStyles(item.pillar))}>
                    <HeaderImage
                        image={item.mainImage}
                        format={format}
                    />
                </div>
                <LiveblogKeyEvents blocks={item.blocks} pillar={item.pillar} />
                <article id="blocks">
                    <LiveblogBody
                        blocks={item.blocks}
                        format={format}
                        totalBodyBlocks={item.totalBodyBlocks}
                    />
                </article>
                <Tags tags={item.tags} background={neutral[93]} />
            </div>
        </main>
    );
}

export default LiveblogArticle;
