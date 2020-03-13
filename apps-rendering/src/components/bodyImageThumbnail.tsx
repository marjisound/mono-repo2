// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css } from '@emotion/core';
import Image, { Props as ImageProps } from 'components/image';
import { Pillar } from 'pillar';

// ----- Setup ----- //

const sizes = `(min-width: 140px)`;


// ----- Component ----- //

interface Props {
    image: Omit<ImageProps, 'sizes'>;
    figcaption: ReactNode;
    pillar: Pillar;
}

const styles = css`
    display: block;
    margin: 1rem 0 0 0;
`;


const BodyImageThumbnail: FC<Props> = ({ image }: Props) =>
    <figure css={styles}>
        <Image {...image} sizes={sizes} thumbnail={true} />
    </figure>


// ----- Exports ----- //

export default BodyImageThumbnail;
