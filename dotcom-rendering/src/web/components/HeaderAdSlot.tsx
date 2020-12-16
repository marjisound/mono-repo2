import React from 'react';
import { css, cx } from 'emotion';
import { AdSlot } from '@root/src/web/components/AdSlot';
import { Hide } from '@root/src/web/components/Hide';

const headerWrapper = css`
    position: static;
`;

const headerAdWrapper = css`
    z-index: 1080;
    width: 100%;
    background-color: white;

    position: sticky;
    top: 0;
`;

const headerAdWrapperHidden = css`
    display: none;
`;

export const HeaderAdSlot: React.FC<{
    isAdFreeUser: boolean;
    shouldHideAds: boolean;
}> = ({ isAdFreeUser, shouldHideAds }) => (
    <div className={headerWrapper}>
        <Hide when="below" breakpoint="tablet">
            <div
                className={cx({
                    [headerAdWrapper]: true,
                    [headerAdWrapperHidden]: isAdFreeUser || shouldHideAds,
                })}
            >
                <AdSlot position="top-above-nav" />
            </div>
        </Hide>
    </div>
);
