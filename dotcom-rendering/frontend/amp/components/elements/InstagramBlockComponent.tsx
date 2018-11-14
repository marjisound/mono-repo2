import React from 'react';

const getShortcode: (url: string) => string = url => {
    const match = /.*\/(.*)\//.exec(url);
    if (match == null) {
        throw new Error('No shortcode could be found for instagram embed.');
    }
    return match[1];
};

export const InstagramBlockComponent: React.SFC<{
    element: InstagramBlockElement;
}> = ({ element }) => {
    const shortcode = getShortcode(element.url);
    return (
        <amp-instagram
            width="1" // Magic numbers, we don't track aspect ratio and instagrams brand is somewhat square based
            height="1" // And if you remove them it'll fill the whole screen
            data-shortcode={shortcode}
            data-captioned={element.hasCaption}
            layout="responsive"
        />
    );
};
