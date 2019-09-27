import React from 'react';
import { sidePadding, PillarStyles, headlineFont } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { Series } from '../../types/Capi';

const ArticleSeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    ${sidePadding}
    a {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: ${kicker};
        text-decoration: none;
        ${headlineFont}
    }
`;

interface ArticleSeriesProps {
    series: Series;
    pillarStyles: PillarStyles;
}

const ArticleSeries = ({ series, pillarStyles }: ArticleSeriesProps): JSX.Element | null =>
    series ? <div css={ArticleSeriesStyles(pillarStyles)}><a href={series.webUrl}>{series.webTitle}</a></div> : null

export default ArticleSeries;
