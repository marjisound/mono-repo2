import React, { ReactNode } from 'react';
import { textSans, basePx } from 'styles';
import { Keyline } from '../shared/keyline';
import { css, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import { formatDate } from 'date';
import Avatar from 'components/shared/avatar';
import LeftColumn from 'components/shared/leftColumn';
import { PillarStyles, getPillarStyles } from 'pillar';
import { CommentCount } from 'components/shared/commentCount';
import { Liveblog } from 'item';
import { renderText } from 'renderer';

const LiveblogBylineStyles = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    background: ${liveblogBackground};
    padding-bottom: ${basePx(1)};

    .author {
        padding-bottom: 4px;

        address {
            font-style: italic;
            a {
                text-decoration: none;
                font-style: normal;
                font-weight: 500;
                padding-top: 4px;
            }
        }

        address, .follow, a {
            color: ${neutral[100]};
        }

        time, .follow {
            ${textSans}
        }

        time {
            ${textSans.small()};
            color: ${neutral[93]};
            opacity: .8;
        }
    }

    section {
        margin-top: ${basePx(-1)};

        .byline {
            width: 80%;
            float: left;
            display: inline-block;

            a {
                background: none;
            }
        }
    }
`;

const commentCount = ({ liveblogBackground }: PillarStyles): SerializedStyles => css`
    border-left: solid 1px rgba(220,220,218,.4);
    button {
        background: ${liveblogBackground};
    }
`

interface LiveblogBylineProps {
    item: Liveblog;
    imageSalt: string;
}

const LiveblogByline = ({ item, imageSalt}: LiveblogBylineProps): JSX.Element => {
    const pillarStyles = getPillarStyles(item.pillar);

    const byline = item.bylineHtml.fmap<ReactNode>(html =>
        <address>{ renderText(html, item.pillar) }</address>
    ).withDefault(null);

    const date = item.publishDate.fmap<ReactNode>(date =>
        <time>{ formatDate(new Date(date)) }</time>
    ).withDefault(null)

    return (
        <div css={[LiveblogBylineStyles(pillarStyles)]}>
            <Keyline {...item} />
            <LeftColumn>
                <section>
                    <div className="byline">
                        <Avatar
                            contributors={item.contributors}
                            bgColour={pillarStyles.featureHeadline}
                            imageSalt={imageSalt}
                        />
                        <div className="author">
                            { byline }
                            { date }
                            <div className="follow">Get alerts on this story</div>
                        </div>
                    </div>

                    {item.commentable
                        ? <CommentCount
                            count={0}
                            colour={neutral[100]}
                            className={commentCount(pillarStyles)}
                          />
                        : null}
                </section>
            </LeftColumn>
        </div>
    )
}

export default LiveblogByline;
