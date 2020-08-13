import React, { ReactElement } from 'react';
import { RelatedItem } from '@guardian/apps-rendering-api-models/relatedItem';
import { css, SerializedStyles } from '@emotion/core';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { remSpace, breakpoints } from '@guardian/src-foundations';
import { Option, withDefault, map, fromNullable } from '@guardian/types/option';
import { makeRelativeDate } from 'date';
import { pipe2 } from 'lib';
import { text, neutral } from '@guardian/src-foundations/palette';
import { Design, Display, Format } from '@guardian/types/Format';
import { Image } from 'image';
import { darkModeCss } from 'styles';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import { getPillarStyles, pillarFromString } from 'pillarStyles';
import Img from 'components/img';
import { border } from 'editorialPalette';



interface Props {
    relatedItem: RelatedItem;
    image: Option<Image>;
}

const listStyles = css`
    background: white;
    margin-right: ${remSpace[3]};
    flex: 0 0 15rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    time {
        ${textSans.small()};
        color: ${text.supporting};
        text-align: right;
        width: calc(100% - ${remSpace[2]});
        display: inline-block;
    }
`

const anchorStyles = css`
    color: ${neutral[7]};
    text-decoration: none;
    ${darkModeCss`
        color: ${neutral[86]};
        background: ${neutral[20]};
    `}
`;

const headingWrapperStyles = css`
    padding: ${remSpace[2]};
    min-height: 150px;
`

const headingStyles = css`
    ${headline.xxxsmall()};
    margin: 0;
`;

const imageWrapperStyles = css`
    padding-bottom: 56.25%;
    position: relative;
`;

const relativeFirstPublished = (date: Option<Date>): JSX.Element | null => pipe2(
    date,
    map(date => <time>{makeRelativeDate(date)}</time>),
    withDefault<JSX.Element | null>(null),
);

const cardStyles = (itemType: RelatedItemType, format: Format): SerializedStyles => {
    switch(itemType) {
        case RelatedItemType.FEATURE: {
            const { kicker } = getPillarStyles(format.pillar);

            return css`
                h2 {
                    ${headline.xxxsmall({ fontWeight: 'bold' })}
                    color: ${kicker};
                }
            `;
        }

        case RelatedItemType.ANALYSIS: {
            return css`
                ${headline.xxxsmall({ lineHeight: 'regular', fontWeight: 'light' })};
                h3 {
                    box-shadow: inset 0 -0.025rem ${border.primary(format)};
                    padding-bottom: 0.2rem;
                    display: inline;

                    ${darkModeCss`
                        box-shadow: inset 0 -0.025rem ${neutral[46]};
                    `}
                }
            `;
        }

        case RelatedItemType.GALLERY: {
            return css``;
        }

        case RelatedItemType.SPECIAL: {
            return css``;
        }

        case RelatedItemType.AUDIO: {
            return css``;
        }

        case RelatedItemType.LIVE: {
            return css``;
        }

        case RelatedItemType.VIDEO: {
            return css``;
        }

        case RelatedItemType.REVIEW: {
            return css``;
        }

        case RelatedItemType.ADVERTISEMENT_FEATURE: {
            return css``;
        }

        case RelatedItemType.COMMENT: {
            return css``;
        }

        default: {
            return css``;
        }
    }
}

const Card = ({ relatedItem, image }: Props): JSX.Element => {

    const format = {
        pillar: pillarFromString(relatedItem.pillar.name),
        design: Design.Article,
        display: Display.Standard
    }

    const sizes = `(min-width: ${breakpoints.phablet}px) 620px, 100%`;

    const img = pipe2(
        image,
        map(img => {
            return <Img
                image={img}
                sizes={sizes}
                format={format}
            />
        }),
        withDefault<ReactElement | null>(null)
    )

    const lastModified = relatedItem.lastModified?.iso8601;
    const date = lastModified ? relativeFirstPublished(fromNullable(new Date(lastModified))) : null;

    return <li css={[listStyles, cardStyles(relatedItem.type, format)]}>
            <a css={anchorStyles} href={relatedItem.link}>
                <section css={headingWrapperStyles}>
                    <h3 css={headingStyles}>{relatedItem.title}</h3>
                </section>
                <section>
                    {date}
                    <div css={imageWrapperStyles}>{img}</div>
                </section>
            </a>
        </li>
}


export default Card;
