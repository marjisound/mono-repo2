// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';
import { from, breakpoints } from '@guardian/src-foundations/mq';

import HeaderMedia from 'headerMedia';
import Series from 'components/series';
import Headline from 'components/headline';
import Standfirst from 'components/standfirst';
import Metadata from 'components/metadata';
import OptionalLogo from 'components/shared/logo';
import Body from 'components/shared/articleBody';
import Tags from 'components/shared/tags';
import { darkModeCss, articleWidthStyles, relatedContentStyles } from 'styles';
import { Keyline } from 'components/shared/keyline';
import { Standard, Review, Item } from 'item';
import { getPillarStyles, stringFromPillar } from 'pillarStyles';
import { Display } from '@guardian/types/Format';
import { remSpace } from '@guardian/src-foundations';
import { pipe2 } from 'lib';
import { map, withDefault } from '@guardian/types/option';
import RelatedContent from 'components/shared/relatedContent';
import ImmersiveCaption from 'components/immersiveCaption';

// ----- Styles ----- //

const Styles = css`
    background: ${neutral[97]};
`;

const DarkStyles = darkModeCss`
    background: ${background.inverse};
`;

const BorderStyles = css`
    background: ${neutral[100]};
    ${darkModeCss`background: ${background.inverse};`}

    ${from.wide} {
        width: ${breakpoints.wide}px;
        margin: 0 auto;
    }
`;

const itemStyles = (item: Item): SerializedStyles => {
    const { kicker, inverted } = getPillarStyles(item.pillar);

    switch (item.display) {
        case Display.Immersive:
            return css`
                p:first-of-type:first-letter,
                hr + p:first-letter {
                    color: ${kicker};
                    display: inline-block;
                    vertical-align: text-top;
                    line-height: 5.625rem;
                    font-size: 6.8125rem;
                    display: inline-block;
                    font-weight: 900;
                    float: left;
                    margin-right: ${remSpace[2]};

                    ${darkModeCss`
                        color: ${inverted};
                    `}
                }
            `;

        default:
            return css``;
    }
}

// ----- Component ----- //

interface Props {
    item: Standard | Review;
    children: ReactNode[];
}

const Standard = ({ item, children }: Props): JSX.Element => {
    // client side code won't render an Epic if there's an element with this id
    const epicContainer = item.shouldHideReaderRevenue
        ? <div id="epic-container"></div>
        : null

    const commentContainer = item.commentable
        ? pipe2(
            item.internalShortId,
            map(id =>
                <section
                    css={css`margin-bottom: ${remSpace[4]}`}
                    id="comments"
                    data-closed={false}
                    data-pillar={stringFromPillar(item.pillar)}
                    data-short-id={id}
                ></section>),
            withDefault(<></>)
          )
        : null

    return <main css={[Styles, DarkStyles]}>
        <article css={BorderStyles}>
            <header>
                <HeaderMedia item={item} />
                <Series item={item} />
                <Headline item={item} />
                <div css={articleWidthStyles}>
                    <Standfirst item={item} />
                    <ImmersiveCaption item={item} />
                </div>
                <Keyline {...item} />
                <section css={articleWidthStyles}>
                    <Metadata item={item} />
                    {OptionalLogo(item)}
                </section>
            </header>
            <Body className={[articleWidthStyles, itemStyles(item)]} format={item}>
                {children}
            </Body>
            {epicContainer}
            <section className="js-tags" css={articleWidthStyles}>
                <Tags tags={item.tags} format={item}/>
            </section>
        </article>
        <footer css={relatedContentStyles}>
            <RelatedContent content={item.relatedContent}/>
            {commentContainer}
        </footer>
    </main>
}


// ----- Exports ----- //

export default Standard;
