import React from 'react';
import { sidePadding, PillarStyles, headlineFont } from '../../styles';
import { css, SerializedStyles } from '@emotion/core'
import { palette } from '@guardian/src-foundations';
import { Series } from '../../types/Capi';
import LeftColumn from 'components/shared/LeftColumn';

const LiveblogSeriesStyles = ({ kicker }: PillarStyles): SerializedStyles => css`    
    background: ${kicker};
    ${sidePadding}
    a {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: ${palette.neutral[100]};
        text-decoration: none;
        ${headlineFont}
    }
`;

interface LiveblogSeriesProps {
    series: Series;
    pillarStyles: PillarStyles;
}

const LiveblogSeries = ({ series, pillarStyles }: LiveblogSeriesProps): JSX.Element | null => {

    if (series) {
        return (
            <LeftColumn
                columnContent={null}
                mainContent={<a href={series.webUrl}>{series.webTitle}</a>}
                className={LiveblogSeriesStyles(pillarStyles)}
            ></LeftColumn>
        );
    }

    return null;

}

export default LiveblogSeries;
