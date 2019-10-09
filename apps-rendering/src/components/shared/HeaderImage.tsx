import React from 'react';
import { css } from '@emotion/core'

import HeaderImageCaption from './HeaderImageCaption';
import { Asset } from 'types/v1_types';

const headerImageStyles = css`
    position: relative;
    img {
        width: 100%;
        display: block;
    }

    margin-bottom: 8px;
`;

interface HeaderImageProps {
    assets: Asset[] | null;
}

const HeaderImage = ({ assets }: HeaderImageProps): JSX.Element | null => {
    if (!assets) return null;

    const { file, typeData: {caption, credit, altText} } = assets[0];
    // TODO: use fastly images
    return (
        <div css={headerImageStyles}>
            <picture>
                {
                    assets.map(({ file, typeData }, index) => {
                        return index + 1 === assets.length
                            ? <source srcSet={file} media={`(max-width: ${typeData.width}px), (min-width: ${typeData.width}px)`} key={index}/>
                            : <source srcSet={file} media={`(max-width: ${typeData.width}px)`} key={index}/>
                    })
                }
                <img src={file} alt={altText}/>
            </picture>
            < HeaderImageCaption caption={caption} credit={credit}/>
        </div>
    )
}

export default HeaderImage;
