// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import { Pillar } from 'format';
import { Option } from 'types/option';
import { Item, getFormat } from 'item';
import { textSans } from "@guardian/src-foundations/typography";
import { renderText } from "../../renderer";
import { remSpace } from "@guardian/src-foundations";
import Dateline from 'components/dateline';


// ----- Styles ----- //

const styles: SerializedStyles = css`
    .author {
        margin: ${remSpace[2]} 0 ${remSpace[3]} 0;
        color: ${neutral[86]};

        .follow, a {
            color: ${neutral[86]};
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


// ----- Component ----- //

interface Props {
    pillar: Pillar;
    publicationDate: Option<Date>;
    className: SerializedStyles;
    item: Item;
}

function Byline({ pillar, publicationDate, className, item }: Props): JSX.Element {

    const byline = item.bylineHtml.fmap<ReactNode>(html =>
        <address>{ renderText(html, getFormat(item)) }</address>
    ).withDefault(null);

    return (
        <div css={[className, styles]}>
            <div>
                <div className="author">
                    { byline }
                    <Dateline date={publicationDate} />
                </div>
            </div>
        </div>
    );
}


// ----- Exports ----- //

export default Byline;
