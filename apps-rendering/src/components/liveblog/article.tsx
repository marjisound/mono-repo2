import React from 'react';

import LiveblogSeries from 'components/liveblog/series';
import LiveblogHeadline from 'components/liveblog/headline';
import LiveblogStandfirst from 'components/liveblog/standfirst';
import LiveblogByline from 'components/liveblog/byline';
import LiveblogKeyEvents from 'components/liveblog/keyEvents';
import LiveblogBody from 'components/liveblog/body';
import HeaderImage from 'components/shared/headerImage';
import Tags from 'components/shared/tags';
import { wideColumnWidth, baseMultiply, darkModeCss } from 'styles';
import { css, SerializedStyles } from '@emotion/core'
import { neutral, background } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { PillarStyles, getPillarStyles } from 'pillar';
import { Liveblog } from 'article';

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
            margin-left: ${wideColumnWidth + baseMultiply(1)}px;
        }
    }
`;

interface LiveblogArticleProps {
    article: Liveblog;
    imageSalt: string;
}

const LiveblogArticle = ({ article, imageSalt }: LiveblogArticleProps): JSX.Element => {

    return (
        <main css={LiveblogArticleStyles}>
            <div css={BorderStyles}>
                <LiveblogSeries series={article.series} pillar={article.pillar} />
                <LiveblogHeadline headline={article.headline} pillar={article.pillar} />
                <LiveblogStandfirst standfirst={article.standfirst} pillar={article.pillar} />
                <LiveblogByline article={article} imageSalt={imageSalt} />
                <HeaderImage
                    image={article.mainImage}
                    imageSalt={imageSalt}
                    className={HeaderImageStyles(getPillarStyles(article.pillar))}
                />
                <LiveblogKeyEvents blocks={article.blocks} pillar={article.pillar} />
                <LiveblogBody
                    blocks={article.blocks}
                    pillar={article.pillar}
                    imageSalt={imageSalt}
                />
                <Tags tags={article.tags} background={neutral[93]} />
            </div>
        </main>
    );
}

export default LiveblogArticle;
