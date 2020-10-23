import React, { FC, ReactElement } from 'react';
import { Item } from 'item';
import { MainMedia, MainMediaKind } from 'headerMedia';
import { Option, OptionKind } from '@guardian/types/option';
import { renderCaption } from 'renderer';
import { Format } from '@guardian/types/Format';
import { css } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { Display } from '@guardian/types/Format';

interface Props {
    item: Item;
}

const captionHeadingStyles = css`
    ${textSans.xsmall()}
    color: ${neutral[46]};
    margin: 0 0 ${remSpace[4]};
    margin-top: ${remSpace[4]};
    display: block;
`;

const buildCaption = (
    cap: Option<DocumentFragment>,
    format: Format,
    credit: Option<string>
): ReactElement | null => {
    if (cap.kind === OptionKind.Some && credit.kind === OptionKind.Some){
        return <p css={captionHeadingStyles}>{renderCaption(cap.value, format)} {credit.value}</p>
    } else if (cap.kind === OptionKind.Some && credit.kind === OptionKind.None){
        return <p css={captionHeadingStyles}>{renderCaption(cap.value, format)}</p>
    } else if (cap.kind === OptionKind.None && credit.kind === OptionKind.Some) {
        return <p css={captionHeadingStyles}>{credit.value}</p>
    }
    return null
}

const caption = (format: Format) => (mainmedia: MainMedia): ReactElement | null => {
    switch (mainmedia.kind) {
        case MainMediaKind.Image:
            return buildCaption(mainmedia.image.caption, format, mainmedia.image.credit)
        case MainMediaKind.Video:
        default:
            return null
    }
}

const ImmersiveCaption: FC<Props> = (props,) => {
    if (props.item.display === Display.Immersive){
        switch (props.item.mainMedia.kind){
            case OptionKind.Some:
                return caption(props.item)(props.item.mainMedia.value)
            case OptionKind.None:
            default:
                return null
        }
    }
    return null

}

export default ImmersiveCaption;
