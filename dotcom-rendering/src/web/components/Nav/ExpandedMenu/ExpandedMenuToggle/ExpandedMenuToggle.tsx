import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { headline } from '@guardian/src-foundations/typography';
import { brandText, brandAlt } from '@guardian/src-foundations/palette';

import { VeggieBurger } from './VeggieBurger';

const screenReadable = css`
    ${visuallyHidden};
`;

const showMoreTextStyles = (menuCheckboxId: string) => css`
    display: block;
    height: 100%;
    :after {
        content: '';
        border: 1px solid currentColor;
        border-left: transparent;
        border-top: transparent;
        display: inline-block;
        height: 8px;
        margin-left: 6px;

        /*
            IMPORTANT NOTE:
            we need to specify the adjacent path to the a (current) tag
            to apply styles to the nested tabs due to the fact we use ~
            to support NoJS
        */
        transform: translateY(-3px) rotate(45deg);
        /* stylelint-disable */
        ${`#${menuCheckboxId}`}:checked ~ label & {
            transform: translateY(1px) rotate(-135deg);
        }
        /* stylelint-enable */

        transition: transform 250ms ease-out;
        vertical-align: middle;
        width: 8px;
    }
    :hover:after {
        transform: translateY(0) rotate(45deg);
        /* refer to comment above */
        /* stylelint-disable */
        ${`#${menuCheckboxId}`}:checked ~ label & {
            transform: translateY(-2px) rotate(-135deg);
        }
        /* stylelint-enable */
    }
`;

const openExpandedMenuStyles = (display: Display) => css`
    ${headline.xsmall()};
    font-weight: 300;
    color: ${brandText.primary};
    cursor: pointer;
    display: none;
    position: relative;
    overflow: hidden;
    border: 0;
    background-color: transparent;
    height: 48px;
    padding-left: 9px;
    padding-right: 20px;
    ${from.desktop} {
        display: block;
        padding-top: ${display === 'immersive' ? '9px' : '5px'};
        height: 42px;
    }
    :hover,
    :focus {
        color: ${brandAlt[400]};
    }
`;

interface Props {
    display: Display;
    menuCheckboxId: string;
    veggieBurgerId: string;
    showMoreNavId: string;
}

export const ExpandedMenuToggle = ({
    display,
    menuCheckboxId,
    veggieBurgerId,
    showMoreNavId,
}: Props) => (
    <>
        <VeggieBurger
            display={display}
            menuCheckboxId={menuCheckboxId}
            key="VeggieBurger"
            id={veggieBurgerId}
        />
        {/* eslint-disable @typescript-eslint/ban-ts-ignore, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role */}
        {/*
        // @ts-ignore */}
        <label
            id={showMoreNavId}
            className={openExpandedMenuStyles(display)}
            aria-label="Toggle main menu"
            key="OpenExpandedMenuButton"
            htmlFor={menuCheckboxId}
            data-link-name="nav2 : veggie-burger"
            // @ts-ignore
            tabindex={0}
            role="button"
        >
            <span className={screenReadable}>Show</span>
            <span className={showMoreTextStyles(menuCheckboxId)}>More</span>
        </label>
        {/* eslint-enable @typescript-eslint/ban-ts-ignore, jsx-a11y/label-has-associated-control, @typescript-eslint/no-unused-expressions, react/no-unknown-property, jsx-a11y/no-noninteractive-element-to-interactive-role  */}
    </>
);
