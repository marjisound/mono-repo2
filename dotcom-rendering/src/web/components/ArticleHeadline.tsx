import React from 'react';
import { css } from 'emotion';

import ClockIcon from '@frontend/static/icons/clock.svg';
import { getAgeWarning } from '@root/src/lib/age-warning';

import { headline, textSans, palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

const curly = (x: any) => x;

const headerStyle = css`
    ${headline({ level: 5 })};
    font-weight: 500;
    padding-bottom: 24px;
    padding-top: 3px;

    ${from.tablet} {
        padding-bottom: 36px;
    }
`;

const ageWarningStyle = css`
    ${textSans({ level: 3 })};
    color: ${palette.neutral[7]};
    background-color: ${palette.yellow.main};
    display: inline-block;
    margin-bottom: 6px;

    > strong {
        font-weight: bold;
    }

    padding: 6px 10px;
    margin-top: 6px;
    margin-left: -10px;

    ${from.mobileLandscape} {
        padding-left: 12px;
    }

    ${from.tablet} {
        margin-left: -20px;
    }

    ${from.leftCol} {
        margin-left: -10px;
        margin-top: -6px;
        padding-left: 10px;
    }
`;

const ageWarningScreenReader = css`
    ${visuallyHidden};
`;

type Props = {
    headlineString: string;
    webPublicationDate: string;
    tags: TagType[];
};

export const ArticleHeadline = ({
    headlineString,
    webPublicationDate,
    tags,
}: Props) => {
    const ageWarning = getAgeWarning(tags, webPublicationDate);
    return (
        <>
            {ageWarning && (
                <div className={ageWarningStyle} aria-hidden="true">
                    <ClockIcon /> This article is more than{' '}
                    <strong>{ageWarning}</strong>
                </div>
            )}
            <h1 className={headerStyle}>{curly(headlineString)}</h1>
            {ageWarning && (
                <div className={ageWarningScreenReader}>
                    This article is more than {` ${ageWarning}`}
                </div>
            )}
        </>
    );
};
