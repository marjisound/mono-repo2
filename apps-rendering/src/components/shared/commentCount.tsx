import React from 'react';
import { SerializedStyles, css } from '@emotion/core';
import { basePx, icons } from 'styles';
import { neutral } from '@guardian/src-foundations/palette';

interface CommentCountProps {
    count: number;
    colour: string;
    className?: SerializedStyles;
}

const CommentCountStyles = (colour: string): SerializedStyles => css`
    float: right;
    display: inline-block;
    text-align: right;
    margin-top: -6px;
    border-left: 1px solid ${neutral[86]};
    box-sizing: border-box;

    span::before {
        ${icons};
        display: block;
        font-size: 1.4rem;
        content: '\\e03c';
        color: ${colour};
    }

    button {
        padding: ${basePx(1, 1, 2, 1)};
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 1.4rem;
        border: none;
        color: ${colour};
    }
`

export const CommentCount = ({ count, colour, className }: CommentCountProps): JSX.Element => {
    return <div css={[CommentCountStyles(colour), className]}>
        <span></span>
        <button>{count}</button>
    </div>
}