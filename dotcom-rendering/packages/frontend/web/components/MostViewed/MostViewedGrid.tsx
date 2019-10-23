import React, { useState } from 'react';
import { css, cx } from 'emotion';
import {
    visuallyHidden,
    headline,
    palette,
    tablet,
    until,
} from '@guardian/src-foundations';

import { TabType, TrailType } from './MostViewed';
import { MostViewedItem } from './MostViewedItem';

const thinGreySolid = `1px solid ${palette.neutral[86]}`;

const hideList = css`
    display: none;
`;

const tabsContainer = css`
    display: flex;
    position: relative;
    border-left: ${thinGreySolid};
    border-right: ${thinGreySolid};
    border-bottom: ${thinGreySolid};

    ${until.leftCol} {
        border-top: ${thinGreySolid};
        border-bottom: 0;
    }
`;

const listTab = css`
    font-weight: 700;
    line-height: 1.1;
    background-color: transparent;
    text-transform: capitalize;
    padding: 0 0 0;
    margin-bottom: 16px;
    width: 240px;
    height: 28px;
`;

const firstTab = css`
    border-right: ${thinGreySolid};
`;

const selectedListTab = (pillar: Pillar) => css`
    /* TODO: Using a pseudo selector here could be faster? */
    box-shadow: inset 0px 4px 0px 0px ${pillar && palette[pillar].dark};
    transition: box-shadow 0.3s ease-in-out;
`;

const unselectedListTab = css`
    &:hover {
        box-shadow: inset 0px 4px 0px 0px ${palette.neutral[86]};
        transition: box-shadow 0.3s ease-in-out;
    }
`;

const tabButton = css`
    ${headline({ level: 1 })};
    margin: 0;
    border: 0;
    background: transparent;
    padding-right: 6px;
    padding-top: 6px;
    text-align: left;
    text-decoration: none;
    font-weight: 600;
    min-height: 36px;
    display: block;
    width: 100%;

    &:hover {
        cursor: pointer;
    }
`;

const gridContainer = css`
    display: grid;
    grid-auto-flow: column;

    /* One column view */
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto auto auto auto auto auto;

    /* Two column view */
    ${tablet} {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto auto auto auto;
    }

    /* We set left border on the grid container, and then right border on
    the gridItems to prevent borders doubling up */
    border-left: 1px solid ${palette.neutral[86]};
`;

type Props = {
    data: TabType[];
    sectionName?: string;
    pillar: Pillar;
};

export const MostViewedGrid = ({ data, sectionName, pillar }: Props) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    return (
        <div>
            {Array.isArray(data) && data.length > 1 && (
                <ul className={tabsContainer} role="tablist">
                    {data.map((tab: TabType, i: number) => (
                        <li
                            className={cx(listTab, {
                                [selectedListTab(pillar)]:
                                    i === selectedTabIndex,
                                [unselectedListTab]: i !== selectedTabIndex,
                                [firstTab]: i === 0,
                            })}
                            role="tab"
                            aria-selected={i === selectedTabIndex}
                            aria-controls={`tabs-popular-${i}`}
                            id={`tabs-popular-${i}-tab`}
                            key={`tabs-popular-${i}-tab`}
                        >
                            <button
                                className={tabButton}
                                onClick={() => setSelectedTabIndex(i)}
                            >
                                <span
                                    className={css`
                                        ${visuallyHidden};
                                    `}
                                >
                                    Most viewed{' '}
                                </span>
                                <span // tslint:disable-line:react-no-dangerous-html
                                    // "Across The Guardian" has a non-breaking space entity between "The" and "Guardian"
                                    dangerouslySetInnerHTML={{
                                        __html: tab.heading,
                                    }}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {data.map((tab: TabType, i: number) => (
                <ol
                    className={cx(gridContainer, {
                        [hideList]: i !== selectedTabIndex,
                    })}
                    id={`tabs-popular-${i}`}
                    key={`tabs-popular-${i}`}
                    role="tabpanel"
                    aria-labelledby={`tabs-popular-${i}-tab`}
                    data-link-name={tab.heading}
                    data-testid={tab.heading}
                    data-link-context={`most-read/${sectionName}`}
                >
                    {(tab.trails || []).map((trail: TrailType, ii: number) => (
                        <MostViewedItem
                            key={trail.url}
                            trail={trail}
                            position={ii + 1}
                        />
                    ))}
                </ol>
            ))}
        </div>
    );
};
