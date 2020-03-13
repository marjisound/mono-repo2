import React from 'react';
import { Pillar, pillarColours } from 'pillar';
import { SvgPlus } from "@guardian/src-svgs"
import { ThemeProvider } from 'emotion-theming'
import { Button } from '@guardian/src-button'

interface Props {
    pillar: Pillar;
    onLoadMore: () => Promise<void>;
}

const LiveblogLoadMore = ({ pillar, onLoadMore }: Props): JSX.Element => {
    const theme = {
        button: {
            textPrimary: pillarColours[pillar].soft,
            backgroundPrimary: pillarColours[pillar].kicker,
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Button onClick={onLoadMore} iconSide="left" icon={<SvgPlus />}>
                View more updates
            </Button>
        </ThemeProvider>
    )
}

export default LiveblogLoadMore;
