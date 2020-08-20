import React, { ReactElement } from 'react';
import { RelatedItem } from '@guardian/apps-rendering-api-models/relatedItem';
import { css, SerializedStyles } from '@emotion/core';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { remSpace, breakpoints } from '@guardian/src-foundations';
import { Option, withDefault, map, fromNullable, OptionKind } from '@guardian/types/option';
import { makeRelativeDate, formatSeconds } from 'date';
import { pipe2 } from 'lib';
import { text, neutral, background } from '@guardian/src-foundations/palette';
import { Design, Display, Format } from '@guardian/types/Format';
import { Image } from 'image';
import { darkModeCss } from 'styles';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import { getPillarStyles, pillarFromString } from 'pillarStyles';
import Img from 'components/img';
import { border } from 'editorialPalette';
import { SvgCamera, SvgVideo, SvgAudio } from '@guardian/src-icons';
import { stars } from 'components/starRating';


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

    ${darkModeCss`
        background: ${neutral[20]};
    `}
`;

const timeStyles = css`
    ${textSans.small()};
    color: ${text.supporting};
    text-align: right;
    display: inline-block;
    vertical-align: top;
`;

const durationStyles = css`
    margin-left: ${remSpace[2]};
`;

const dateStyles = css`
    float: right;
`

const anchorStyles = css`
    color: ${neutral[7]};
    text-decoration: none;
    ${darkModeCss`
        color: ${neutral[86]};
    `}
`;

const headingWrapperStyles = css`
    padding: ${remSpace[2]};
    min-height: 150px;
`

const headingStyles = css`
    ${headline.xxxsmall()};
    margin: 0 0 ${remSpace[2]} 0;
`;

const imageWrapperStyles = css`
    padding-bottom: 56.25%;
    position: relative;
`;

const relativeFirstPublished = (date: Option<Date>): JSX.Element | null => pipe2(
    date,
    map(date => <time css={[timeStyles, dateStyles]}>{makeRelativeDate(date)}</time>),
    withDefault<JSX.Element | null>(null),
);

const cardStyles = (itemType: RelatedItemType, format: Format): SerializedStyles => {
    switch (itemType) {
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

        case RelatedItemType.VIDEO:
        case RelatedItemType.AUDIO:
        case RelatedItemType.GALLERY: {
            return css`
                background: ${background.inverse};
                h3 {
                    color: ${text.ctaPrimary};
                }
            `;
        }

        case RelatedItemType.SPECIAL: {
            return css``;
        }

        case RelatedItemType.LIVE: {
            const { kicker, liveblogDarkBackground } = getPillarStyles(format.pillar);
            return css`
                background: ${kicker};
                h3, time {
                    color: ${text.ctaPrimary};
                }
                ${darkModeCss`
                    background: ${liveblogDarkBackground};
                `}
            `;
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

const parentIconStyles: SerializedStyles = css`
    display:inline-block;
    svg {
        width: 1rem;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0.25rem;
        display: block;
    }
`;

const iconStyles = (format: Format): SerializedStyles => {
    const { inverted } = getPillarStyles(format.pillar);
    return css`
        width: 1.5rem;
        height: 1.5rem;
        display: inline-block;
        background-color: ${inverted};
        border-radius: 50%;
    `;
}

const icon = (itemType: RelatedItemType, format: Format): ReactElement | null => {
    switch (itemType){
        case RelatedItemType.GALLERY:
            return <span css={iconStyles(format)}>< SvgCamera /></span>;
        case RelatedItemType.AUDIO:
            return <span css={iconStyles(format)}>< SvgAudio /></span>;
        case RelatedItemType.VIDEO:
            return <span css={iconStyles(format)}>< SvgVideo /></span>
        default:
            return null;
    }
}

const metadataStyles: SerializedStyles = css`
    padding: 0 ${remSpace[2]};
    min-height: 1.5rem
`;

const durationMedia = (duration: Option<string>): ReactElement | null => {
    return pipe2(
        duration,
        map(length => {
            const seconds = formatSeconds(length);
            if (seconds.kind === OptionKind.Some) {
                return <time css={[timeStyles, durationStyles]}>
                    {seconds.value}
                </time>
            } else {
                return null;
            }
        }),
        withDefault<ReactElement | null>(null)
    )
}

const Card = ({ relatedItem, image }: Props): JSX.Element => {
    const format = {
        pillar: pillarFromString(relatedItem.pillar.id),
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
    const starRating = relatedItem.starRating && !Number.isNaN(parseInt(relatedItem.starRating))
        ? stars(parseInt(relatedItem.starRating)) : null;

    return <li css={[listStyles, cardStyles(relatedItem.type, format)]}>
        <a css={anchorStyles} href={relatedItem.link}>
            <section css={headingWrapperStyles}>
                <h3 css={headingStyles}>{relatedItem.title}</h3>
                {starRating}
            </section>
            <section>
                <div css={metadataStyles}>
                    <section css={parentIconStyles}>
                        {icon(relatedItem.type, format)}
                    </section>
                    {durationMedia(fromNullable(relatedItem.mediaDuration))}
                    {date}
                </div>
                <div css={imageWrapperStyles}>{img}</div>
            </section>
        </a>
    </li>
}


export default Card;