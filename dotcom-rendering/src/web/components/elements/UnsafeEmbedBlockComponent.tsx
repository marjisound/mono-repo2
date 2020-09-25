import React, { useState, useEffect, useRef } from 'react';

type Props = {
    html: string;
    alt?: string;
};

let numberOfIntervals = 0;
export const UnsafeEmbedBlockComponent = ({ html }: Props) => {
    const [iframeHeight, setIframeHeight] = useState<number>(0);
    const iFrameRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (numberOfIntervals >= 12) return;

        const timer = setInterval(() => {
            const doc =
                iFrameRef.current &&
                iFrameRef.current.contentWindow &&
                iFrameRef.current.contentWindow.document;

            numberOfIntervals++;

            if (doc) {
                setIframeHeight(
                    doc.documentElement.scrollHeight ||
                        doc.documentElement.scrollHeight ||
                        0,
                );
            }

            if (numberOfIntervals >= 12) clearInterval(timer);
        }, 300);

        return () => clearInterval(timer);
    }, [iFrameRef]);

    return (
        <iframe
            data-cy="embed-block"
            ref={iFrameRef}
            style={{ height: iframeHeight }}
            srcDoc={html}
        />
    );
};
