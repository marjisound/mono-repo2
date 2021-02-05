import React from 'react';
import { css, cx } from 'emotion';

import { Design } from '@guardian/types';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { until } from '@guardian/src-foundations/mq';

import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import { Kicker } from '@root/src/web/components/Kicker';
import { Byline } from '@root/src/web/components/Byline';
import { pillarPalette } from '@frontend/lib/pillars';
import { space } from '@guardian/src-foundations';

type Props = {
	headlineText: string; // The text shown
	design: Design; // Used to decide when to add type specific styles
	pillar: Theme; // Used to colour the headline (dark) and the kicker (main)
	kickerText?: string;
	showPulsingDot?: boolean;
	showSlash?: boolean;
	showQuotes?: boolean; // Even with design !== Comment, a piece can be opinion
	size?: SmallHeadlineSize;
	byline?: string;
	showByline?: boolean;
	isFullCardImage?: boolean; // Used for carousel AB test
};
const fontStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'large':
			return css`
				${headline.xsmall()};
				${until.desktop} {
					${headline.xxsmall()};
				}
			`;
		case 'medium':
			return css`
				${headline.xxsmall()};
				${until.desktop} {
					${headline.xxxsmall()};
				}
			`;
		case 'small':
			return css`
				${headline.xxxsmall()};
			`;
		case 'tiny':
			return css`
				${headline.xxxsmall()};
				font-size: 14px;
			`;
	}
};

const underlinedStyles = (size: SmallHeadlineSize) => {
	function generateUnderlinedCss(baseSize: number) {
		return css`
			background-image: linear-gradient(
				to bottom,
				transparent,
				transparent ${baseSize - 1}px,
				rgba(199, 0, 0, 0.5)
			);
			line-height: ${baseSize - 1}px;
			background-size: 1px ${baseSize}px;
			background-origin: content-box;
			background-clip: content-box;
			margin-right: -5px;
		`;
	}
	switch (size) {
		case 'small':
			return generateUnderlinedCss(21);
		case 'medium':
			return generateUnderlinedCss(24);
		case 'large':
			return generateUnderlinedCss(28);
		default:
			return generateUnderlinedCss(23);
	}
};

const colourStyles = (colour: string) => css`
	color: ${colour};
`;

const headlineStyles = (design: Design, pillar: Theme) => {
	switch (design) {
		case Design.Feature:
		case Design.Interview:
			return colourStyles(pillarPalette[pillar].dark);
		case Design.Media:
		case Design.Live:
			return colourStyles(neutral[97]);
		default:
			return undefined;
	}
};

const fullCardImageTextStyles = css`
	${headline.xxxsmall()};
	color: ${neutral[100]};
	background-color: rgba(0, 0, 0, 0.75);
	box-shadow: -${space[1]}px 0 0 rgba(0, 0, 0, 0.75);
	/* Box decoration is required to push the box shadow out on Firefox */
	box-decoration-break: clone;
	line-height: 1.25;
	white-space: pre-wrap;
`;

export const CardHeadline = ({
	headlineText,
	design,
	pillar,
	showQuotes,
	kickerText,
	showPulsingDot,
	showSlash,
	size = 'medium',
	byline,
	showByline,
	isFullCardImage,
}: Props) => (
	<>
		<h4
			className={cx(
				fontStyles(size),
				design === Design.Analysis && underlinedStyles(size),
				isFullCardImage &&
					css`
						line-height: 1; /* Reset line height in full image carousel */
					`,
			)}
		>
			<span className={cx(isFullCardImage && fullCardImageTextStyles)}>
				{kickerText && (
					<Kicker
						text={kickerText}
						design={design}
						pillar={pillar}
						showPulsingDot={showPulsingDot}
						showSlash={showSlash}
						inCard={true}
					/>
				)}
				{showQuotes && (
					<QuoteIcon
						colour={pillarPalette[pillar].main}
						size={size}
					/>
				)}

				<span className={headlineStyles(design, pillar)}>
					{headlineText}
				</span>
			</span>
		</h4>
		{byline && showByline && (
			<Byline text={byline} design={design} pillar={pillar} size={size} />
		)}
	</>
);
