import React from 'react';
import { Caption } from '@guardian/guui/components/Caption/Caption';

export const VideoGuardian: React.FC<{
    element: VideoGuardian;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    return (
        <Caption captionText={element.caption} pillar={pillar} dirtyHtml={true}>
            <amp-video controls={''} width="16" height="9" layout="responsive">
                <div fallback={''}>
                    Sorry, your browser is unable to play this video.
                    <br />
                    Please <a href="http://whatbrowser.org/">upgrade</a> to a
                    modern browser and try again.
                </div>
                {element.assets.map(
                    encoding =>
                        encoding.mimeType.includes('video') && (
                            <source
                                src={encoding.url}
                                type={encoding.mimeType}
                            />
                        ),
                )}
            </amp-video>
        </Caption>
    );
};
