import React from 'react';
import { css } from 'react-emotion';

import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { headline } from '@guardian/pasteup/fonts';

import { Column, More } from './Column';
import { palette } from '@guardian/pasteup/palette';

const ColumnsStyle = css`
    box-sizing: border-box;
    max-width: none;
    ${desktop} {
        max-width: 980px;
        background-color: ${palette.neutral[97]};
        padding: 0 20px;
        position: relative;
        margin: 0 auto;
        display: flex;
    }
    ${leftCol} {
        max-width: 1140px;
    }
    ${wide} {
        max-width: 1300px;
    }
`;

const desktopBrandExtensionColumn = css`
    ${desktop} {
        display: block;
    }
    display: none;
    position: absolute;
    right: 20px;
    top: 18px;
    bottom: 0;
`;

const brandExtensionList = css`
    width: 186px;
    box-sizing: border-box;
    font-size: 18px;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0 0 12px;
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    ${leftCol} {
        width: 220px;
    }
    ${wide} {
        width: 300px;
    }
`;

const brandExtensionListItem = css`
    margin-right: 0;
    margin-top: -6px;
    padding-bottom: 0;
`;

const brandExtensionLink = css`
    font-size: 24px;
    font-weight: 700;
    line-height: 1.1;
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    color: ${palette.neutral[7]};
    cursor: pointer;
    display: inline-block;
    font-family: ${headline};
    outline: none;
    padding: 8px 34px 8px 50px;
    position: relative;
    text-align: left;
    width: 100%;
    text-decoration: none;
    ${tablet} {
        padding-left: 60px;
    }
    ${desktop} {
        padding: 6px 0;
    }
    :hover,
    :focus {
        color: ${palette.neutral[20]};
        text-decoration: underline;
    }
    > * {
        pointer-events: none;
    }
`;

export const Columns: React.SFC<{
    nav: NavType;
}> = ({ nav }) => (
    <ul className={ColumnsStyle} role="menubar" tabIndex={-1}>
        {nav.pillars.map((column, i) => (
            <Column column={column} key={column.title.toLowerCase()} />
        ))}
        <More
            column={nav.otherLinks}
            brandExtensions={nav.brandExtensions}
            key="more"
        />
        <li className={desktopBrandExtensionColumn} role="none">
            <ul className={brandExtensionList} role="menu">
                {nav.brandExtensions.map(brandExtension => (
                    <li
                        className={brandExtensionListItem}
                        key={brandExtension.title}
                    >
                        <a
                            className={brandExtensionLink}
                            href={brandExtension.url}
                            key={brandExtension.title}
                            role="menuitem"
                        >
                            {brandExtension.longTitle || brandExtension.title}
                        </a>
                    </li>
                ))}
            </ul>
        </li>
    </ul>
);
