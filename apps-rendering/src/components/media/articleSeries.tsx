import React, { ReactElement, FC } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { Series } from 'capi';
import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Pillar } from '@guardian/types/Format';
import { headline } from '@guardian/src-foundations/typography';
import { Option, map, withDefault } from '@guardian/types/option';
import { pipe2 } from 'lib';

const ArticleSeriesStyles = ({ inverted }: PillarStyles): SerializedStyles => css`    
    a {
        ${headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
        color: ${inverted};
        text-decoration: none;
    }
`;

interface ArticleSeriesProps {
    series: Option<Series>;
    pillar: Pillar;
}

const ArticleSeries: FC<ArticleSeriesProps> = (props) =>
    pipe2(
        props.series,
        map(series =>
            <nav css={ArticleSeriesStyles(getPillarStyles(props.pillar))}>
                <a href={series.webUrl}>{series.webTitle}</a>
            </nav>
        ),
        withDefault<ReactElement | null>(null),
    );

export default ArticleSeries;
