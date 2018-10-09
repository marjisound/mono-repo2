import React from 'react';
import { cx, css } from 'react-emotion';

import { serif } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
import { mobileLandscape, tablet } from '@guardian/pasteup/breakpoints';
import { getCookie } from '../../../../lib/cookie';
import { AsyncClientComponent } from '../../../lib/AsyncClientComponent';

const style = css`
    position: relative;
    display: block;
    float: left;
    margin-left: -10px;
    text-decoration: none;

    ${mobileLandscape} {
        margin-left: 0;
    }

    :before {
        background-color: ${palette.neutral[7]};
        border-radius: 50%;
        bottom: -12px;
        left: 0;
        right: 0;
        padding-top: 100%;
        content: '';
        display: block;
        position: absolute;
        transition-timing-function: ease-out;
        transition-duration: 250ms;
        transition-property: background-color 250ms, transform 250ms;
    }

    :hover:before {
        background-color: ${palette.news.main};
        transform: scale(1.05);
    }
`;

const text = css`
    color: ${palette.neutral[97]};
    font-family: ${serif.headline};
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    line-height: 1.2;
    padding: 6px 20px 3px;
    position: relative;

    ${tablet} {
        font-size: 14px;
    }
`;

const SupportTheGuardian: React.SFC<{}> = () => (
    <AsyncClientComponent f={shouldShow}>
        {({ data }) => (
            <>
                {data && (
                    <a className={style} href="/">
                        <div className={text}>
                            Support The
                            <br /> Guardian
                        </div>
                    </a>
                )}
            </>
        )}
    </AsyncClientComponent>
);

const shouldShow: () => Promise<boolean> = () =>
    Promise.resolve(!(isRecentContributor() || isPayingMember()));

const isRecentContributor: () => boolean = () => {
    const value = getCookie('gu.contributions.contrib-timestamp');

    if (!value) {
        return false;
    }

    const now = new Date().getTime();
    const lastContribution = new Date(value).getTime();
    const diffDays = Math.ceil((now - lastContribution) / (1000 * 3600 * 24));

    return diffDays <= 180;
};

const isPayingMember: () => boolean = () => {
    return getCookie('gu_paying_member') === 'true';
};

export default SupportTheGuardian;
