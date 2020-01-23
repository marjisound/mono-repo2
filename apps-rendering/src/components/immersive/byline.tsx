// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';

import Follow from 'components/shared/follow';
import { sidePadding, textSans, darkModeCss, basePx } from 'styles';
import { formatDate } from 'date';
import { Contributor } from 'capi';
import { PillarStyles, getPillarStyles, Pillar } from 'pillar';
import { Option } from 'types/option';

// ----- Styles ----- //

const Styles = ({ kicker }: PillarStyles): SerializedStyles => css`
    .author {
        margin: ${basePx(1, 0, 2, 0)};

        .follow, a {
            color: ${kicker};
        }

        time, .follow {
            ${textSans}
        }

        time {
            font-size: 1.4rem;
            color: ${palette.neutral[46]};
        }
    }
`;

const DarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};

    .author {
        .follow, a {
            color: ${inverted};
        }

        time {
            color: ${palette.neutral[60]};
        }
    }
`;


// ----- Component ----- //

interface Props {
    pillar: Pillar;
    publicationDate: Option<Date>;
    contributors: Contributor[];
    className: SerializedStyles;
}

function Byline({ pillar, publicationDate, contributors, className }: Props): JSX.Element {
    const pillarStyles = getPillarStyles(pillar);

    return (
        <div css={[className, Styles(pillarStyles), DarkStyles(pillarStyles)]}>
            <div css={sidePadding}>
                <div className="author">
                    { publicationDate
                        // This is not an iterator, ESLint is confused
                        // eslint-disable-next-line react/jsx-key
                        .map<JSX.Element | null>(date => <time>{formatDate(date)}</time>)
                        .withDefault(null) }
                    <Follow contributors={contributors} />
                </div>
            </div>
        </div>
    );
}


// ----- Exports ----- //

export default Byline;
