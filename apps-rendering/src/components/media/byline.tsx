// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';
import { darkModeCss } from 'styles';
import { PillarStyles, getPillarStyles, Pillar } from 'pillar';
import { Option } from 'types/option';
import Dateline from 'components/dateline';
import { Item } from 'item';
import { textSans } from "@guardian/src-foundations/typography";
import { renderText } from "../../renderer";
import { remSpace } from "@guardian/src-foundations";


// ----- Styles ----- //

const Styles = ({ kicker }: PillarStyles): SerializedStyles => css`
    color: ${neutral[86]};
    
    .author {
        margin: ${remSpace[2]} 0 ${remSpace[3]} 0;

        .follow, a {
            color: ${kicker};
        }

        time, .follow {
            ${textSans.xsmall()}
        }

        time {
            ${textSans.xsmall()};
            color: ${neutral[86]};
        }
    }
`;

const DarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    .author {
        .follow, a {
            color: ${inverted};
        }

        time {
            color: ${neutral[86]};
        }
    }
`;


// ----- Component ----- //

interface Props {
    pillar: Pillar;
    publicationDate: Option<Date>;
    className: SerializedStyles;
    item: Item;
}

function Byline({ pillar, publicationDate, className, item }: Props): JSX.Element {
    const pillarStyles = getPillarStyles(pillar);

    const byline = item.bylineHtml.fmap<ReactNode>(html =>
        <address>{ renderText(html, item.pillar) }</address>
    ).withDefault(null);

    return (
        <div css={[className, Styles(pillarStyles), DarkStyles(pillarStyles)]}>
            <div>
                <div className="author">
                    { byline }
                    <Dateline date={item.publishDate} />
                </div>
            </div>
        </div>
    );
}


// ----- Exports ----- //

export default Byline;
